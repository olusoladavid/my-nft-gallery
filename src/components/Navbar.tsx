import * as React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import ConnectToMetaMaskButton from "./ConnectWallet";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#3f51b5",
  },
  logo: {
    flexGrow: 1,
    textAlign: "left",
  },
});

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h6" className={classes.logo}>
          NFT Galleria
        </Typography>
        <ConnectToMetaMaskButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
