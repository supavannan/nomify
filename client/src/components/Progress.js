import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    height: 0,
    marginLeft: "5%",
    marginRight: "5%",
    "& > * + *": {
      marginTop: "0%",
    },
    marginTop: "0%",
    marginBottom: "2%",
  },
  bar: {
    borderRadius: 5,
    height: 15,
    color: "#1a90ff",
  },
}));

export default function LinearDeterminate(props) {
  const classes = useStyles();
  //   const [progress, setProgress] = React.useState(0);
  const { nominated } = props;
  let numNominated = nominated.length;
  let prog = numNominated > 5 ? 100 : numNominated * 20;
  return (
    <Container maxWidth="lg">
      <Container
        maxWidth="lg"
        style={{
          display: "flex",
          justifyContent: "left",
          marginLeft: "3%",
          marginBottom: "0%",
        }}
      >
        {numNominated < 5 ? (
          <h5>Progress: {numNominated} of 5 Nominations</h5>
        ) : (
          <h5>Done!</h5>
        )}
      </Container>
      <div className={classes.root}>
        <LinearProgress
          variant="determinate"
          value={prog}
          className={classes.bar}
        />
      </div>
    </Container>
  );
}
