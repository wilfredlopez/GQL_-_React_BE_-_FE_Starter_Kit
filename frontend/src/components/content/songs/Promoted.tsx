import * as React from "react";
import SongSquare from "./SongSquare";
import { Container } from "@material-ui/core";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BigSpinner } from "../../shared/BigSpinner";
import useSongContext from "../../../context/useSongContext";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    promotedGrid: {
      display: "block",
      [theme.breakpoints.up("md")]: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridColumnGap: "1em"
      }
    }
  })
);

export interface PromotedProps {
  limit?: number;
}

function Promoted(props: PromotedProps) {
  const classes = useStyles();

  const { playlist } = useSongContext();
  let content: JSX.Element[] = [<BigSpinner key="test1" />];

  if (playlist) {
    content = playlist.map(s => <SongSquare s={s} key={`${s.id}-promoted`} />);
  }

  return (
    <Container maxWidth="md" style={{ background: "#c1c1c1", color: "#fff" }}>
      <br />
      <h2>HOT NOW!</h2>
      <div className={classes.promotedGrid}>{content}</div>
      <br />
    </Container>
  );
}

export default React.memo(Promoted);
