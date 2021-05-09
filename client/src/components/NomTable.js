import React, { Component } from "react";
import { Button } from "@material-ui/core";
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
import TableUI from "@material-ui/core/Table";

const useStyles = makeStyles({
  table: {
    minWidth: "90%",
    maxWidth: "90%",
    margin: "5%",
  },
  paper: {
    maxHeight: 400,
    width: "80%",
    marginTop: "2%",
    marginLeft: "10%",
    marginRight: "10%",
    overflow: "auto",
  },
  cell: {
    minWidth: "15%",
    maxWidth: "15%",
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
          <TableCell className={classes.cell}>
            {headingsInfo[heading].name}
          </TableCell>
        );
      } else {
        headings.push(
          <TableCell className={classes.cell}>{heading}</TableCell>
        );
      }
    }
  }
  headings.push(<TableCell className={classes.cell}>Remove</TableCell>);
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
      elements.push(<TableCell>{data[heading]}</TableCell>);
    }

    return (
      <TableRowUI key={index}>
        {elements}
        <TableCell>
          {/* <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton> */}
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
    <TableContainer className={classes.paper} component={Paper}>
      <TableUI className={classes.table}>
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
  );
};

export default Table;
