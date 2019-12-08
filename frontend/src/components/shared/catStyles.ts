import { makeStyles } from "@material-ui/core/styles";

export const catStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "4rem",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 0,
    maxWidth: "95%"
  },
  paper: {
    padding: 0,
    textAlign: "center",
    color: theme.palette.text.primary
  },
  privacyLink: {
    color: theme.palette.secondary.main
  }
}));
