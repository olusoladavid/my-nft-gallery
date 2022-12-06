import React from "react";
import Navbar from "./components/Navbar";
import TokenGrid from "./components/TokenGrid";
import { MuiThemeProvider } from "@material-ui/core";
import { withStyles, createStyles, createTheme, responsiveFontSizes } from "@material-ui/core/styles";

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
    <MuiThemeProvider theme={responsiveTheme}>
      <div className="App">
        <Navbar />
        <div className={classes.root}>
          <TokenGrid />
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
