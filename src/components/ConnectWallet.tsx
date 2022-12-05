import * as React from 'react';
import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { AccountBalanceWallet } from "@material-ui/icons";
import { ethers } from 'ethers';

const useStyles = makeStyles({
  connectButton: {
    color: "white",
    backgroundColor: "transparent",
    border: "2px solid white",
    borderRadius: "4px",
  },
});

interface IState {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  accountAddress: string | null;
}

const ConnectToMetaMaskButton: React.FC = () => {
  const classes = useStyles();
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = React.useState<ethers.Signer | null>(null);
  const [accountAddress, setAccountAddress] = React.useState<string | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuItem, setMenuItem] = React.useState<string | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    // Check if web3 is available
    if (typeof (window as any).ethereum !== 'undefined') {
      // Connect to the MetaMask provider
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      setProvider(provider);

      try {
        // Request account access
        (window as any).ethereum.enable().then(async () => {
          // Get the default signer
          const signer = provider.getSigner();
          setSigner(signer);

          // Get the account address
          const accountAddress = await signer.getAddress();
          setAccountAddress(accountAddress);
        });
      } catch (error) {
        // User denied account access...
      }
    }
    // web3 is not available
    else {
      console.error('Please install MetaMask to use this dApp.');
    }
  }, []);

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<AccountBalanceWallet />}
        className={classes.connectButton}
        aria-controls="connect-to-metamask-menu"
        aria-haspopup="true"
        onClick={() => {
          if (accountAddress !== null) {
            setMenuOpen(!menuOpen);
          } else {
            handleConnectToMetaMask();
          }
        }}
        ref={buttonRef}
      >
        {accountAddress
          ? `${accountAddress.slice(0, 6)}...${accountAddress.slice(-4)}`
          : "Connect to MetaMask"}
      </Button>
      <Menu
        id="connect-to-metamask-menu"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorEl={buttonRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            setMenuOpen(false);
            setAccountAddress(null);
          }}
        >
          Disconnect
        </MenuItem>
      </Menu>
    </div>
  );

  function handleConnectToMetaMask() {
    if (provider) {
      // Get the default signer
      const signer = provider.getSigner();
      setSigner(signer);

      // Get the account address
      signer.getAddress().then((accountAddress) => {
        setAccountAddress(accountAddress);
      });
    }
  }
};

export default ConnectToMetaMaskButton;
