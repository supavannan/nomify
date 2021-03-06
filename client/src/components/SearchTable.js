import React, { Component } from "react";
import { Button } from "@material-ui/core";
import TableUI from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core/styles";
import TableBodyUI from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHeadUI from "@material-ui/core/TableHead";
import TableRowUI from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
    maxWidth: "100%",
    marginLeft: "0%",
    marginRight: "0%",
  },
  paper: {
    maxHeight: 400,
    width: "80%",
    marginTop: "0%",
    marginBottom: "3%",
    marginLeft: "10%",
    marginRight: "10%",
    overflow: "auto",
  },
  slider: {
    width: 300,
  },
  headCell: {
    fontWeight: "bold",
    background: "black",
    color: "#ffffff",
    fontSize: "15px",
  },
  cell: {
    fontSize: "30px",
    borderBottom: "none",
  },
});

const TableHeader = (props) => {
  const headings = [];
  const { tableHeadings, headingsInfo } = props;
  const classes = useStyles();
  headings.push(<TableCell className={classes.headCell}>Poster</TableCell>);
  for (let heading in tableHeadings) {
    if (tableHeadings[heading]) {
      if (headingsInfo[heading]) {
        headings.push(
          <TableCell className={classes.headCell}>
            {headingsInfo[heading].name}
          </TableCell>
        );
      } else {
        headings.push(
          <TableCell className={classes.headCell}>{heading}</TableCell>
        );
      }
    }
  }
  headings.push(<TableCell className={classes.headCell}>Nominate</TableCell>);
  //headings.push(<TableCell>Row</TableCell>);
  return (
    <TableHeadUI style={{ wordWrap: "break-word" }}>
      <TableRowUI>{headings}</TableRowUI>
    </TableHeadUI>
  );
};

class TableRow extends Component {
  state = {
    stateData: {},
    buttonDisabled: false,
  };

  componentDidMount() {
    const { data, nominated } = this.props;
  }

  render() {
    const { data, index, tableHeadings, nominateMovie, nominated } = this.props;
    const elements = [];
    elements.push(
      <TableCell style={{ borderBottom: "none" }}>
        <img
          src={data["Poster"]}
          alt="Poster"
          style={{ width: "80px", height: "100px", borderRadius: "15px" }}
        />
      </TableCell>
    );
    for (let heading in tableHeadings) {
      if (tableHeadings[heading]) {
        elements.push(
          <TableCell
            style={{ fontSize: "20px", color: "white", borderBottom: "none" }}
          >
            {data[heading]}
          </TableCell>
        );
      }
    }

    let buttonInactive = false;
    if (nominated.includes(data["imdbID"]) || nominated.length >= 5) {
      buttonInactive = true;
    }
    return (
      <TableRowUI key={index}>
        {elements}
        <TableCell style={{ borderBottom: "none" }}>
          <Button
            disabled={buttonInactive}
            color="primary"
            variant="outlined"
            onClick={() => nominateMovie(index)}
            // style={{
            //   color: "green",
            //   border: "1px solid green",
            // }}
          >
            {nominated.includes(data["imdbID"]) ? "Nominated" : "Nominate"}
          </Button>
        </TableCell>
        {/* <td>{index}</td> */}
      </TableRowUI>
    );
  }
}

const TableBody = (props) => {
  const {
    searchResults,
    tableHeadings,
    headingsInfo,
    nominateMovie,
    nominated,
  } = props;
  const rows = searchResults.map((entry, index) => {
    return (
      <TableRow
        index={index}
        data={entry}
        tableHeadings={tableHeadings}
        headingsInfo={headingsInfo}
        nominateMovie={nominateMovie}
        nominated={nominated}
      />
    );
  });
  return <TableBodyUI>{rows}</TableBodyUI>;
};

const Table = (props) => {
  //passed from App component
  const {
    searchResults,
    tableHeadings,
    headingsInfo,
    nominateMovie,
    nominated,
    searchMessage,
    displayResults,
  } = props;
  // console.log(searchResults);
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      {!displayResults && (
        <Container
          maxWidth="md"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10%",
          }}
        >
          <h5
            style={{
              fontStyle: "italic",
            }}
          >
            {searchMessage}
          </h5>
        </Container>
      )}
      {displayResults && (
        <div>
          <Container
            maxWidth="md"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1%",
            }}
          >
            <h4>Your Search Results</h4>
          </Container>
          <TableContainer className={classes.paper}>
            <TableUI className={classes.table} stickyHeader>
              {/* <TableHeader
                tableHeadings={tableHeadings}
                headingsInfo={headingsInfo}
              /> */}
              <TableBody
                searchResults={searchResults}
                tableHeadings={tableHeadings}
                headingsInfo={headingsInfo}
                nominateMovie={nominateMovie}
                nominated={nominated}
              />
            </TableUI>
          </TableContainer>
        </div>
      )}
    </Container>
  );
};

export default Table;
