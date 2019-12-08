import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
const playerStyles = makeStyles((theme: Theme) =>
  createStyles({
    outcontainer: {
      position: "fixed",
      right: 0,
      bottom: 16,
      padding: 0,
      width: "auto",
      maxWidth: " 70vw"
    },
    myContainer: {
      position: "fixed",
      right: 0,
      bottom: 15,
      padding: 0,
      width: "auto",
      maxWidth: " 100%"
    },
    listContainerDiv: {
      display: "flex",
      alignItems: "center"
    },
    deleteBTN: {
      color: "red"
    },
    avatar: {
      backgroundColor: blue[100],
      color: blue[600]
    },
    fab: {
      margin: theme.spacing(1),
      overflow: "hidden",
      "&:hover": {
        // background: "#4352cd"
        background: "#55c565"
      }
    },
    fabActive: {
      margin: theme.spacing(1),
      overflow: "hidden",
      // background: "#5c5d65",
      background: "#e0e0e0",

      height: 48,
      width: 48,
      color: theme.palette.text.primary.concat(" !important"),
      "&:hover": {
        background: theme.palette.grey[400],
        color: theme.palette.text.hint.concat(" !important")
      }
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    actions: {
      display: "flex",
      justifyContent: "flex-end"
    },
    para: {
      lineHeight: 1
    },
    trackIcon: {
      marginRight: theme.spacing(0)
    },
    emptyList: {
      margin: theme.spacing(1)
    },
    minimizeIcon: {
      // color: theme.palette.text.primary
      color: "inherit"
    }
  })
);

export default playerStyles;
