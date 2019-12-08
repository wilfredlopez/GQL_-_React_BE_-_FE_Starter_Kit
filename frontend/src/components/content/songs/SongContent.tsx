import * as React from "react";

import SongSquare from "./SongSquare";
import { Container } from "@material-ui/core";
import { SongContextPlaylist } from "../../../context/songContext";

export interface ISongContentProps {
  Songs: SongContextPlaylist[];
}

function SongContent(props: ISongContentProps) {
  return (
    <Container maxWidth="md">
      <br />
      <div>
        {props.Songs.map(s => {
          return <SongSquare s={s} key={s.id} />;
        })}
      </div>
    </Container>
  );
}

export default React.memo(SongContent);
