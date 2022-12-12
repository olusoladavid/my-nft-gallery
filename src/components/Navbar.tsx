import React, { useContext } from "react";
import { SvgIcon } from "@mui/material";
import { CollectionsOutlined, Bolt } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SimulationModeContext } from "../contexts/SimulationMode";
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
  simulationIcon: {
    fontSize: "32px",
    color: "#fff",
    marginRight: "20px",
    cursor: "pointer",
  },
});

const Navbar: React.FC = () => {
  const classes = useStyles();

  const { isSimulationMode, toggleSimulationMode } = useContext(
    SimulationModeContext
  );

  const handleSimulationIconClick = () => {
    toggleSimulationMode();
  };

  return (
    <AppBar position="sticky" className={classes.navbar}>
      <Toolbar>
        <SvgIcon component={CollectionsOutlined} className={classes.logoIcon} />
        <Typography variant="h6" className={classes.logo}>
          MyNFTGallery
        </Typography>
        <Tooltip
          title={
            isSimulationMode
              ? "Turn off Simulation Mode"
              : "Turn on Simulation Mode"
          }
        >
          <SvgIcon
            component={Bolt}
            className={classes.simulationIcon}
            onClick={handleSimulationIconClick}
            style={{ color: isSimulationMode ? "#b9f516" : "#aaa" }}
          />
        </Tooltip>
        <ConnectButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
