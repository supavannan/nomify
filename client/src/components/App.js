import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";

import Header from "./Header";
import Banner from "./Banner";
import SearchBar from "./SearchBar";
import SearchTable from "./SearchTable";
import NomTable from "./NomTable";
import CheckboxOptions from "./CheckboxOptions";
import Progress from "./Progress";

const searchTableHeadings = {
  Title: true,
  Year: true,
  imdbID: false,
};

const nomTableHeadings = {
  Title: true,
  Year: true,
  imdbID: false,
  Runtime: false,
  Genre: true,
  Language: false,
  Country: false,
  imdbRating: true,
  imdbVotes: false,
};

const headingsInfo = {
  Title: { name: "Movie Title", viewing: true },
  Year: { name: "Year", viewing: "small" },
  imdbID: { name: "ID", viewing: "small" },
  Runtime: { name: "Runtime", viewing: "small" },
  Genre: { name: "Genre", viewing: "small" },
  Language: { name: "Language", viewing: "small" },
  Country: { name: "Country", viewing: "small" },
  imdbRating: { name: "IMDB Rating", viewing: "small" },
  imdbVotes: { name: "# Votes", viewing: "small" },
};

const apiBaseURL = "https://www.omdbapi.com/?";
const apiKEY = "f5265cbb";

//const Header = () => <h2>Stock Search</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const Configure = () => <h2>Configure</h2>;
const Landing = () => <h2>Welcome to Nomify</h2>;

class App extends Component {
  state = {
    searchResults: [],
    nominated: [],
    nominatedMovies: [],
    searchTableHeadings: searchTableHeadings,
    nomTableHeadings: nomTableHeadings,
    displayResults: false,
    maxNumResults: 10,
    searchMessage: "",
  };

  componentDidMount() {
    this.props.fetchUser();
  }

  updateMaxNumResults = (event, value) => {
    //console.log(value);
    const { maxNumResults } = this.state;
    this.setState({
      maxNumResults: value,
    });
  };

  updateHeadings = (heading, newCheckState) => {
    const { nomTableHeadings } = this.state;
    this.setState({
      //flip the state of the given heading (true to false, false to true)
      nomTableHeadings: { ...nomTableHeadings, [heading]: newCheckState },
    });
  };

  handleSearch = async (entry) => {
    let pageNumber = 1;
    let endpoint = `${apiBaseURL}s=${entry.keyword}&type=movie&apikey=${apiKEY}`;
    ////endpoint = "https://www.omdbapi.com/?s=${ra}&type=movie&apikey=f5265cbb";
    let result = await fetch(endpoint);
    let resultJSON = await result.json();
    let displayMessage = "";
    //console.log(this.state.maxNumResults);
    if (resultJSON["Response"] === "True") {
      let totalResults = this.state.maxNumResults;
      if (resultJSON["totalResults"] < totalResults) {
        totalResults = resultJSON["totalResults"];
      }
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
      this.setState({
        searchResults: allResults,
        displayResults: true,
        searchMessage: displayMessage,
      });
    } else {
      this.setState({
        searchResults: [],
        displayResults: false,
      });
      displayMessage = `Error, ${resultJSON["Error"]}`;
      if (displayMessage === `Error, Incorrect IMDb ID.`) {
        displayMessage = `Error, Invalid Entry`;
      }
      this.setState({
        searchMessage: displayMessage,
      });
    }
    //console.log(this.state.searchMessage);
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
      searchTableHeadings,
      nomTableHeadings,
      displayResults,
      searchMessage,
    } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Container maxWidth="lg">
            <Route path="/landing" component={Landing} />
            <Header />

            {nominated.length >= 5 && <Banner />}
            <Route path="/landing" component={Landing} />
            <Container maxWidth="lg">
              <SearchBar
                handleSubmit={this.handleSearch}
                updateMaxNumResults={this.updateMaxNumResults}
              />

              <SearchTable
                searchResults={searchResults}
                tableHeadings={searchTableHeadings}
                nominated={nominated}
                nominateMovie={this.nominateMovie}
                searchMessage={searchMessage}
                displayResults={displayResults}
                headingsInfo={headingsInfo}
              />
            </Container>

            {true && <Progress nominated={nominated} />}

            <NomTable
              tableHeadings={nomTableHeadings}
              headingsInfo={headingsInfo}
              nominated={nominated}
              nominatedMovies={nominatedMovies}
              removeNomination={this.removeNomination}
            />

            <CheckboxOptions
              tableHeadings={nomTableHeadings}
              updateHeadings={this.updateHeadings}
              headingsInfo={headingsInfo}
            />
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}

//actions will be assigned as props to the App component
export default connect(null, actions)(App);
