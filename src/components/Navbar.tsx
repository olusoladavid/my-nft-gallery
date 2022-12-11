import * as React from "react";
import { SvgIcon } from "@mui/material";
import { CollectionsOutlined } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#3f51b5",
  },
  logo: {
    flexGrow: 1,
    textAlign: "left",
    marginLeft: "8px",
    fontWeight: 700,
  },
  logoIcon: {
    height: "24px",
    color: "#fff",
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
        <ConnectButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
