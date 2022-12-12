import React from "react";
import Navbar from "./components/Navbar";
import TokenGrid from "./components/TokenGrid";
import {
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { ToastContainer } from "react-toastify";
import { SimulationModeProvider } from "./contexts/SimulationMode";

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

const theme = createTheme(
  adaptV4Theme({
    typography: {
      fontFamily: '"Varela Round", sans-serif',
    },
  })
);

const responsiveTheme = responsiveFontSizes(theme);

function App({ classes }: any) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={customTheme} chains={chains}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={responsiveTheme}>
            <SimulationModeProvider>
              <div className="App">
                <ToastContainer />
                <Navbar />
                <div className={classes.root}>
                  <TokenGrid />
                </div>
              </div>
            </SimulationModeProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default withStyles(styles)(App);
