import React from "react";
import { ArrowBack } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    position: "fixed",
    top: "8%",
    left: "0",
    background: "rgba(0, 0, 0, 0.05)"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

// Memory Router => objects with { pathname, search, hash, state } or simple string URLs.

interface GoBackProps extends RouteComponentProps {}

function GoBack(props: GoBackProps) {
  const classes = useStyles();

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <React.Fragment>
      {props.history.length > 0 && (
        <IconButton
          aria-label="Go Back"
          className={classes.margin}
          size="medium"
          onClick={goBack}
        >
          <ArrowBack fontSize="inherit" />
        </IconButton>
      )}
    </React.Fragment>
  );
}

export default withRouter(GoBack);
