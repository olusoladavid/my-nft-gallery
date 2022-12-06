import React, { useState } from "react";
import { ethers } from "ethers";
import useWalletTokens from "../hooks/useWalletTokens";
import transferNFT from "../helpers/transferNft";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  Button,
  Modal,
  TextField,
  Paper,
  lighten
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

export interface IToken {
  contract: string;
  tokenId: string;
  name: string;
  image: string;
  collection: {
    id: string;
    name: string;
    imageUrl: string;
    floorAskPrice: number;
  };
}

interface ITokenOwnership {
  token: IToken;
  ownership: {
    tokenCount: string;
    onSaleCount: string;
    floorAsk: {
      id: string | null;
      price: string | null;
      maker: string | null;
      validFrom: string | null;
      validUntil: string | null;
      source: {};
    };
    acquiredAt: string;
  };
}

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRadius: "10px",
    position: "relative",
    zIndex: 2,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
    "&:hover": {
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
      cursor: "pointer",
      "& $sendButton": {
        display: "flex",
        animation: "$slideUp 0.2s ease-in-out 0s",
      },
    },
  },
  cardMedia: {
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    objectFit: "cover",
  },
  cardContent: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    color: "#000000",
    padding: "5px 10px",
  },
  tokenName: {
    fontSize: "15px",
    margin: 0,
    padding: 0,
  },
  tokenId: {
    fontSize: "13px",
    margin: 0,
    padding: 0,
    color: "#A3A3A3",
  },
  sendButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: "0 0 10px 10px",
    backgroundColor: "#3f51b5",
    color: "#FFFFFF",
    textTransform: "capitalize",
    display: "none",
    "&:hover": {
      backgroundColor: lighten("#3f51b5", 0.1),
    },
  },
  "@keyframes slideUp": {
    "0%": {
      transform: "translateY(100%)",
    },
    "100%": {
      transform: "translateY(0)",
    },
  },
});

const TokenGrid = () => {
  const classes = useStyles();
  const walletAddress = "0x4fDE6e0Af241816A38346ee014482F88311d0451";
  const tokens: ITokenOwnership[] = useWalletTokens(walletAddress);

  const validTokens = tokens.filter((token) => token.token && token.token.name);

  // State to track the modal visibility
  const [modalOpen, setModalOpen] = useState(false);
  // State to track the input value in the text field
  const [inputValue, setInputValue] = useState("");
  // State to track the selected token
  const [selectedToken, setSelectedToken] = useState<IToken | null>(null);

  const handleCardClick = (token: IToken) => {
    // Redirect the user to the Etherscan page for the NFT token
    window.open(
      `https://etherscan.io/token/${token.contract}?a=${token.tokenId}`,
      "_blank"
    );
  };

  const handleSendButtonClick = (event: React.MouseEvent, token: IToken) => {
    event.stopPropagation();
    setModalOpen(true);
    setSelectedToken(token);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setSelectedToken(null);
  };

  const handleModalSend = async () => {
    if (!selectedToken) {
      return;
    }
    // Get the provider and wallet instance from the injected web3 object
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();

    try {
      await transferNFT({
        provider,
        contractAddress: selectedToken.contract,
        tokenId: selectedToken.tokenId,
        toAddress: inputValue,
        signer,
      });
    } catch (error) {
      console.error(error);
    }

    // Close the modal after the transaction has been sent
    setModalOpen(false);
    // Reset the input value
    setInputValue("");
    setSelectedToken(null);
  };

  const isValidAddress = inputValue ? ethers.utils.isAddress(inputValue) : true;

  return (
    <>
      <Grid container spacing={3}>
        {validTokens.map((token, index) => (
          <Grid item xs={3} key={index}>
            <Card
              className={classes.card}
              onClick={() => handleCardClick(token.token)}
            >
              {token.token?.image && (
                <CardMedia
                  className={classes.cardMedia}
                  component="img"
                  alt={token.token.name}
                  height="140"
                  image={token.token.image}
                  title={token.token.name}
                />
              )}
              {token.token?.name && (
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant="h6"
                    component="h2"
                    className={classes.tokenName}
                  >
                    {token.token.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    className={classes.tokenId}
                  >
                    #
                    {token.token.tokenId.length > 5
                      ? `${token.token.tokenId.substring(0, 5)}...`
                      : token.token.tokenId}
                  </Typography>
                </CardContent>
              )}
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                disableElevation
                classes={{
                  root: classes.sendButton,
                }}
                onClick={(event) => handleSendButtonClick(event, token.token)}
              >
                Send
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={modalOpen}>
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: 8,
            padding: 20,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Typography variant="h5">Send NFT</Typography>
            <Typography variant="body1">
              Enter the address of the recipient below:
            </Typography>
            <TextField
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Recipient address"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              style={{ height: 40, marginBottom: 20 }}
              error={!isValidAddress}
              helperText={
                isValidAddress ? "" : "Please enter a valid Ethereum address"
              }
            />
            <div style={{ height: 25 }} />
            <Button
              onClick={handleModalCancel}
              variant="contained"
              color="secondary"
              style={{ marginRight: 10 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleModalSend}
              variant="contained"
              color="primary"
              disabled={!inputValue}
            >
              Send
            </Button>
          </div>
        </Paper>
      </Modal>
    </>
  );
};

export default TokenGrid;
