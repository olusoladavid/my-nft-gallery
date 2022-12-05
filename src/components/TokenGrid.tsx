import React from "react";
import useWalletTokens from "../hooks/useWalletTokens";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

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

const TokenGrid = () => {
  // const walletAddress = "0x5e6b5cc6997460410c0470a3f36f4197db810a80";
  const walletAddress = "0x4fDE6e0Af241816A38346ee014482F88311d0451";
  const tokens: ITokenOwnership[] = useWalletTokens(walletAddress);

  return (
    <Grid container spacing={3}>
      {tokens.map((token, index) => (
        <Grid item xs={3} key={index}>
          <Card>
            <CardMedia
              component="img"
              alt={token.token.name}
              height="140"
              image={token.token.image}
              title={token.token.name}
            />
            <CardContent>
              <Typography variant="h6" component="h2">
                {token.token.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TokenGrid;
