import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: "#236160",
    justifyContent: "center",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    margin: "10px",
  },
}));

const Banner = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root} backgroundColor="black">
      <AppBar position="static" className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          Done! You have at least 5 nominations!
        </Typography>
      </AppBar>
    </div>
  );
};

export default Banner;
