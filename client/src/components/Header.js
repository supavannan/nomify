import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { Button, IconButton } from "@material-ui/core";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    justifyContent: "center",
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "3%",
        fontSize: "36px",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "56px",
          color: "green",
          fontFamily: "Courier New",
        }}
      >
        Nomify
      </h1>
    </Container>
  );
};

export default Header;
