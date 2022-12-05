import React from "react";
import Navbar from "./components/Navbar";
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
    </div>
  );
}

export default withStyles(styles)(App);
