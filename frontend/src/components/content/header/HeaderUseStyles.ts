import {
  fade,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 2,
      width: "100%",
      // position: "-webkit-sticky",
      //eslint-disable-next-line
      position: "sticky",
      top: 0,
      zIndex: 1199
    },
    menuButton: {
      // marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      textAlign: "center",
      [theme.breakpoints.up("sm")]: {
        display: "flex"
      }
    },
    search: {
      position: "relative",
      display: "flex",
      flexGrow: 2,
      alignItems: "center",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        // marginLeft: theme.spacing(1),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      // color: theme.palette.primary.dark,
      color: theme.palette.common.black.concat(" !important"),
      flexGrow: 2
    },
    inputInput: {
      background: "white !important",
      padding: theme.spacing(1, 1, 1, 1).concat(" !important"),
      transition: theme.transitions.create("width"),
      width: "100%",
      flexGrow: 1,
      [theme.breakpoints.up("sm")]: {
        width: "300px !important",
        maxWidth: "30vw",
        flexGrow: 1,
        // padding: theme.spacing(1, 1, 1, 7),
        "&:focus": {
          width: "280px !important"
        }
      }
    },
    fullList: {
      width: "auto"
    },
    "wilfred-brand": {
      color: "#fff",
      cursor: "pointer",
      textDecoration: "none",
      textTransform: "uppercase",
      flexGrow: 1
    },
    margin: {
      margin: "1px",
      background: "rgba(0, 0, 0, 0.43)"
    },
    Fab: {
      width: 35,
      height: 35,
      margin: "1px",
      background: "rgba(0, 0, 0, 0.43)"
    },
    contactEmail: {
      color: theme.palette.action.active
    }
  })
);
