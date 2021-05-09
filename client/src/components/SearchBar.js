import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  slider: {
    width: "100%",
    justifyContent: "center",
  },
}));

function valuetext(value) {
  return `${value}`;
}

function DiscreteSlider(props) {
  const classes = useStyles();
  const { updateMaxNumResults } = props;
  return (
    <div className={classes.slider}>
      <Typography
        id="discrete-slider"
        gutterBottom
        style={{ width: "100%", marginBottom: "0px", justifyContent: "center" }}
      >
        Max Query Size
      </Typography>
      <Slider
        onChange={updateMaxNumResults}
        defaultValue={10}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={150}
      />
    </div>
  );
}

class Form extends Component {
  initialState = {
    keyword: "",
    other: "",
  };

  state = this.initialState;

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      keyword: value,
    });
  };

  submitSearchForm = (e) => {
    //this.state holds "keyword"
    //handleSubmit refers to the handleSearch function passed by "App"
    this.props.handleSubmit(this.state);
    //reset form state to initial state to clear form
    //this.setState(this.initialState);
    e.preventDefault();
  };

  render() {
    const { keyword } = this.state;
    return (
      <Container maxWidth="lg">
        <form
          style={{
            width: "100%",
            margin: "0%",
            marginTop: "5%",
            marginBottom: "1px",
          }}
          onSubmit={this.submitSearchForm}
        >
          <div>
            <label htmlFor="keyword">Search Keyword</label>
            <TextField
              type="text"
              name="keyword"
              id="keyword"
              value={keyword}
              onChange={this.handleChange}
              variant="outlined"
              style={{
                width: "100%",
                boxShadow: "0px 0px 0px 0px",
                marginBottom: "10px",
              }}
            />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DiscreteSlider
                updateMaxNumResults={this.props.updateMaxNumResults}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={this.submitSearchForm}
                // style={{ background: "#0d824b", position: "relative" }}
                style={{ position: "relative" }}
              >
                Search
              </Button>
            </div>
          </div>
        </form>
      </Container>
    );
  }
}

export default Form;
