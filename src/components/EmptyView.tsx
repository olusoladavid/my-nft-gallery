import React from "react";
import { Grid, Typography } from "@mui/material";

const EmptyView = ({ walletIsConnected }: { walletIsConnected: boolean }) => {
  const imgSrc = walletIsConnected ? "./images/emptybox.gif" : "./images/wallet.png";
  const title = walletIsConnected
    ? "There are no tokens to display"
    : "No wallet connected";
  const subtitle = walletIsConnected
    ? "Please switch to another wallet or mint some NFTs."
    : "Please connect your wallet to view your NFTs";

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ height: "50vh", width: "50vw", margin: "auto" }}
    >
      <img alt={title} src={imgSrc} style={{ maxWidth: "150px" }} />
      <div style={{ textAlign: "center" }}>
        <Typography variant="h4" align="center">
          {title}
        </Typography>
        <Typography variant="body1" align="center">
          {subtitle}
        </Typography>
      </div>
    </Grid>
  );
};

export default EmptyView;
