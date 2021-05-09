import React, { Component } from "react";
import { Button } from "@material-ui/core";
import TableUI from "@material-ui/core/Table";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { green, white } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TableBodyUI from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHeadUI from "@material-ui/core/TableHead";
import TableRowUI from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
    maxWidth: "100%",
    marginLeft: "0%",
    marginRight: "0%",
  },
  paper: {
    height: 400,
    width: "80%",
    marginTop: "5%",
    marginLeft: "10%",
    marginRight: "10%",
    overflow: "auto",
  },
});

const TableHeader = (props) => {
  const headings = [];
  const { tableHeadings, headingsInfo } = props;

  for (let heading in tableHeadings) {
    if (tableHeadings[heading]) {
      if (headingsInfo[heading]) {
        headings.push(<TableCell>{headingsInfo[heading].name}</TableCell>);
      } else {
        headings.push(<TableCell>{heading}</TableCell>);
      }
    }
  }
  headings.push(<TableCell>Nominate</TableCell>);
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
    for (let heading in tableHeadings) {
      elements.push(<TableCell>{data[heading]}</TableCell>);
    }

    let buttonInactive = false;
    if (nominated.includes(data["imdbID"])) {
      buttonInactive = true;
    }
    return (
      <TableRowUI key={index}>
        {elements}
        <TableCell>
          <Button
            disabled={buttonInactive}
            //style={{ color: "#ffffff", backgroundColor: green[500] }}
            color="primary"
            variant="outlined"
            onClick={() => nominateMovie(index)}
          >
            Nominate
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
  } = props;
  console.log(searchResults);
  const classes = useStyles();
  if (searchResults.length > 0) {
    return (
      <TableContainer className={classes.paper}>
        <TableUI className={classes.table} stickyHeader>
          <TableHeader
            tableHeadings={tableHeadings}
            headingsInfo={headingsInfo}
          />
          <TableBody
            searchResults={searchResults}
            tableHeadings={tableHeadings}
            headingsInfo={headingsInfo}
            nominateMovie={nominateMovie}
            nominated={nominated}
          />
        </TableUI>
      </TableContainer>
    );
  } else {
    return <div>No Results</div>;
  }
};

export default Table;
