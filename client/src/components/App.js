import React, { Component, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import Header from "./Header";
import SearchBar from "./SearchBar";
import SearchTable from "./SearchTable";
import NomTable from "./NomTable";
import ResultTable from "./ResultTable";

const tableHeadings = {
  Title: true,
  Year: true,
  imdbID: true,
};

const headingsInfo = {
  Title: { name: "Title", viewing: true },
  Year: { name: "Year", viewing: "small" },
  imdbID: { name: "ID", viewing: "small" },
};

const apiBaseURL = "http://www.omdbapi.com/?";
const apiKEY = "f5265cbb";

class App extends Component {
  state = {
    searchResults: [],
    nominated: [],
    nominatedMovies: [],
    tableHeadings: tableHeadings,
    displayResults: false,
  };

  componentDidMount() {
    this.props.fetchUser();
  }

  handleSearch = async (entry) => {
    const apiBaseURL = "http://www.omdbapi.com/?";
    const apiKEY = "f5265cbb";
    let pageNumber = 1;
    let endpoint = `${apiBaseURL}s=${entry.keyword}&type=movie&apikey=${apiKEY}`;
    //console.log(endpoint);
    let result = await fetch(endpoint);
    let resultJSON = await result.json();
    let allResults = [];
    if (resultJSON["Response"] === "True") {
      //let totalResults = resultJSON["totalResults"];
      let totalResults = 10;
      let numResultsSoFar = resultJSON["Search"].length;
      let allResults = resultJSON["Search"];
      while (numResultsSoFar < totalResults) {
        pageNumber += 1;
        endpoint = `${apiBaseURL}s=${entry.keyword}&page=${pageNumber}&type=movie&apikey=${apiKEY}`;
        result = await fetch(endpoint);
        resultJSON = await result.json();
        allResults = allResults.concat(resultJSON["Search"]);
        numResultsSoFar += resultJSON["Search"].length;
      }
      console.log(totalResults);
      this.setState({
        searchResults: allResults,
        displayResults: true,
      });
    } else {
      this.setState({
        searchResults: [],
        displayResults: false,
      });
    }
    console.log(this.state.searchResults.length);
  };

  nominateMovie = async (index) => {
    const { nominated, nominatedMovies, searchResults } = this.state;
    const movieID = searchResults[index]["imdbID"];
    const endpoint = `${apiBaseURL}i=${movieID}&apikey=${apiKEY}`;
    const result = await fetch(endpoint);
    const resultJSON = await result.json();
    this.setState({
      nominated: [...nominated, movieID],
      nominatedMovies: [...nominatedMovies, resultJSON],
    });
    //console.log(this.state.nominatedDetails);
  };

  removeNomination = (index) => {
    const { nominated, nominatedMovies } = this.state;
    this.setState({
      //filter out (remove) given index and return new array
      nominated: nominated.filter((nomination, i) => {
        return i !== index;
      }),
      nominatedMovies: nominatedMovies.filter((nomination, i) => {
        return i !== index;
      }),
    });
  };

  render() {
    const {
      searchResults,
      nominated,
      nominatedMovies,
      tableHeadings,
      displayResults,
    } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Container maxWidth="lg">
            <Header />
            {true && (
              <NomTable
                tableHeadings={tableHeadings}
                headingsInfo={headingsInfo}
                nominated={nominated}
                nominatedMovies={nominatedMovies}
                removeNomination={this.removeNomination}
              />
            )}
            <Container maxWidth="md">
              <SearchBar handleSubmit={this.handleSearch} />
              {displayResults && (
                <SearchTable
                  searchResults={searchResults}
                  tableHeadings={tableHeadings}
                  headingsInfo={headingsInfo}
                  nominated={nominated}
                  nominateMovie={this.nominateMovie}
                />
              )}
            </Container>
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}

//actions will be assigned as props to the App component
export default connect(null, actions)(App);
