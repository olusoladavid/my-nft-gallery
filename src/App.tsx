import React from "react";
import Navbar from "./components/Navbar";
import TokenGrid from "./components/TokenGrid";
import { MuiThemeProvider } from "@material-ui/core";
import {
  withStyles,
  createStyles,
  createTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "NFT Gallery",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const customTheme: Theme = {
  ...lightTheme(),
  fonts: {
    body: '"Varela Round", sans-serif',
  },
};

const styles = createStyles({
  root: {
    margin: "16px",
  },
});

const theme = createTheme({
  typography: {
    fontFamily: '"Varela Round", sans-serif',
  },
});

const responsiveTheme = responsiveFontSizes(theme);

function App({ classes }: any) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={customTheme} chains={chains}>
        <MuiThemeProvider theme={responsiveTheme}>
          <div className="App">
            <Navbar />
            <div className={classes.root}>
              <TokenGrid />
            </div>
          </div>
        </MuiThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default withStyles(styles)(App);
