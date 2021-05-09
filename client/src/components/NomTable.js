import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TableBodyUI from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHeadUI from "@material-ui/core/TableHead";
import TableRowUI from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableUI from "@material-ui/core/Table";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
    maxWidth: "100%",
    margin: "0%",
  },
  paper: {
    minHeight: 400,
    maxHeight: 400,
    width: "80%",
    marginTop: "1%",
    marginBottom: "1%",
    marginLeft: "10%",
    marginRight: "10%",
    overflow: "auto",
  },
  cell: {
    justifyContent: "center",
  },
  headCell: {
    fontWeight: "bold",
  },
});

const TableHeader = (props) => {
  const headings = [];
  const { tableHeadings, headingsInfo } = props;
  const classes = useStyles();
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
  headings.push(<TableCell className={classes.headCell}>Remove</TableCell>);
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
    const {
      data,
      index,
      tableHeadings,
      nominated,
      removeNomination,
    } = this.props;
    const elements = [];
    for (let heading in tableHeadings) {
      if (tableHeadings[heading]) {
        elements.push(<TableCell>{data[heading]}</TableCell>);
      }
    }

    return (
      <TableRowUI key={index}>
        {elements}
        <TableCell>
          <Button
            disabled={false}
            variant="outlined"
            color="primary"
            onClick={() => removeNomination(index)}
          >
            Remove
          </Button>
        </TableCell>
        {/* <td>{index}</td> */}
      </TableRowUI>
    );
  }
}

const TableBody = (props) => {
  const {
    nominatedMovies,
    tableHeadings,
    headingsInfo,
    nominateMovie,
    nominated,
    removeNomination,
  } = props;
  const rows = nominatedMovies.map((entry, index) => {
    return (
      <TableRow
        index={index}
        data={entry}
        tableHeadings={tableHeadings}
        headingsInfo={headingsInfo}
        nominateMovie={nominateMovie}
        nominated={nominated}
        removeNomination={removeNomination}
      />
    );
  });
  return <TableBodyUI>{rows}</TableBodyUI>;
};

const Table = (props) => {
  //passed from App component
  const {
    nominatedMovies,
    tableHeadings,
    headingsInfo,
    nominated,
    removeNomination,
  } = props;
  const classes = useStyles();
  return (
    <div>
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "3%",
        }}
      >
        <h3>Your Nominations</h3>
      </Container>
      <TableContainer className={classes.paper} component={Paper}>
        <TableUI className={classes.table} stickyHeader>
          <TableHeader
            tableHeadings={tableHeadings}
            headingsInfo={headingsInfo}
          />
          <TableBody
            nominatedMovies={nominatedMovies}
            tableHeadings={tableHeadings}
            headingsInfo={headingsInfo}
            nominated={nominated}
            removeNomination={removeNomination}
          />
        </TableUI>
      </TableContainer>
    </div>
  );
};

export default Table;
