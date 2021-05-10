import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  bar: {
    borderRadius: 5,
    height: 15,
    color: "#1a90ff",
  },
  box: {
    backgroundColor: "white",
    outline: "2px auto rgba(19,124,189,.6)",
  },
}));

const CustomCheckbox = (props) => {
  const { tableHeadings, updateHeadings, name, headingsInfo } = props;
  const classes = useStyles();
  return (
    <FormControlLabel
      control={
        <Checkbox
          className={classes.root}
          checked={tableHeadings[name]}
          onChange={() => updateHeadings(name, !tableHeadings[name])}
          name={name}
          color="green"
          outline="1px solid #1e5180"
        />
      }
      label={headingsInfo[name].name}
    />
  );
};

const CheckboxOptions = (props) => {
  const { tableHeadings, updateHeadings, headingsInfo } = props;
  const classes = useStyles();
  const checkboxes = [];

  for (let heading in tableHeadings) {
    //don't add a checkbox for Movie Title
    if (heading !== "Title") {
      checkboxes.push(
        <CustomCheckbox
          className={classes.box}
          tableHeadings={tableHeadings}
          updateHeadings={updateHeadings}
          headingsInfo={headingsInfo}
          name={heading}
        />
      );
    }
  }
  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "1%",
      }}
    >
      <FormGroup row>{checkboxes}</FormGroup>
    </Container>
  );
};

export default CheckboxOptions;
