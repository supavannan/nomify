import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

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
    const { keyword, other } = this.state;
    return (
      <form
        style={{ width: "90%", margin: "5%", marginBottom: "1px" }}
        onSubmit={this.submitSearchForm}
      >
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
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={this.submitSearchForm}
          style={{ background: "#0d824b", marginLeft: "0%" }}
        >
          Search
        </Button>
      </form>
    );
  }
}

export default Form;
