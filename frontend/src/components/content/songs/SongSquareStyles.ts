import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const SongSquareStyles = makeStyles((theme: Theme) =>
  createStyles({
    playsChip: {
      color: theme.palette.text.primary.concat(" !important"),
      background: theme.palette.background.default.concat(" !important"),
      //   background: theme.palette.text.secondary.concat(" !important"),
      margin: "1rem 2.5rem 0rem 0rem !important"
    },
    imageContent: {
      width: "92vw",
      height: "100vh",
      maxHeight: 350,
      maxWidth: 350,
      marginTop: "1rem"
    },
    wCardActions: {
      justifyContent: "center"
    },
    hotBatch: {
      zIndex: 0
    },
    playsBadge: {
      marginTop: "1rem",
      zIndex: 0
    }
  })
);
