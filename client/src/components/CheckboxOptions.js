import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";

const CustomCheckbox = (props) => {
  const { tableHeadings, updateHeadings, name, headingsInfo } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={tableHeadings[name]}
          onChange={() => updateHeadings(name, !tableHeadings[name])}
          name={name}
          color="primary"
        />
      }
      label={headingsInfo[name].name}
    />
  );
};

class CheckboxOptions extends Component {
  render() {
    const { tableHeadings, updateHeadings, headingsInfo } = this.props;
    const checkboxes = [];
    for (let heading in tableHeadings) {
      //don't add a checkbox for Movie Title
      if (heading !== "Title") {
        checkboxes.push(
          <CustomCheckbox
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
          marginBottom: "20%",
        }}
      >
        <FormGroup row>{checkboxes}</FormGroup>
      </Container>
    );
  }
}

export default CheckboxOptions;
