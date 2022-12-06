import * as React from "react";
import { SvgIcon } from "@material-ui/core";
import { CollectionsOutlined } from "@material-ui/icons";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import ConnectToMetaMaskButton from "./ConnectWallet";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#3f51b5",
  },
  logo: {
    flexGrow: 1,
    textAlign: "left",
    marginLeft: "8px",
    fontWeight: 700
  },
  logoIcon: {
    height: "24px",
    color: "#fff"
  },
});

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.navbar}>
      <Toolbar>
        <SvgIcon component={CollectionsOutlined} className={classes.logoIcon} />
        <Typography variant="h6" className={classes.logo}>
          MyNFTGallery
        </Typography>
        <ConnectToMetaMaskButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
