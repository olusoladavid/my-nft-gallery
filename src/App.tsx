import React from "react";
import Navbar from "./components/Navbar";
import TokenGrid from "./components/TokenGrid";
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = createStyles({
  root: {
    margin: "16px",
  },
});

function App({ classes }: any) {
  return (
    <div className="App">
      <Navbar />
      <div className={classes.root}>
        <TokenGrid />
      </div>
    </div>
  );
}

export default withStyles(styles)(App);
