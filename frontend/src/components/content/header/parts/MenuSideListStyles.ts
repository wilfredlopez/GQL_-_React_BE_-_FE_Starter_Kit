import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useMenuSideListStyles = makeStyles((theme: Theme) =>
  createStyles({
    albumColor: {
      color: theme.palette.text.primary
    },
    list: {
      width: 250
    },
    "wilfred-link": {
      color: theme.palette.text.primary,
      // color: "#000",
      textDecoration: "none"
    },

    selectTheme: {
      "&:hover": {
        background: "red"
      }
    }
  })
);
