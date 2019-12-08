import React from "react";
import { ArrowUpward } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    position: "fixed",
    top: "70%",
    right: "2px",
    background: "rgba(245, 245, 245, 0.5)"
  },
  marginText: {
    margin: theme.spacing(1),
    position: "fixed",
    top: "75%",
    right: "4px",
    fontSize: "15px"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

function BackToTop() {
  const classes = useStyles();
  const [position, setPosition] = React.useState<number | null>(null);

  window.addEventListener("scroll", function(event) {
    var scroll = this.scrollY;
    if (scroll > 750) {
      setPosition(scroll);
    } else {
      setPosition(null);
    }
    //  console.log(scroll)
  });

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
    <React.Fragment>
      {position && (
        <React.Fragment>
          <IconButton
            aria-label="Delete"
            className={classes.margin}
            size="medium"
            onClick={goToTop}
          >
            <ArrowUpward fontSize="inherit" />
            <p className={classes.marginText}></p>
          </IconButton>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default BackToTop;
