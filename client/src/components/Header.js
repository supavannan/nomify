import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { Button, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#0d824b",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root} backgroundColor="black">
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Nomify
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
