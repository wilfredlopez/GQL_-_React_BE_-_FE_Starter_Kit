import {
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton
} from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";
import React from "react";
import { SongContextPlaylist } from "../../../context/songContext";
import useSongContext from "../../../context/useSongContext";

interface Props {
  data: SongContextPlaylist[];
}

const FavoriteList: React.FC<Props> = ({ data }) => {
  const { playAudio, currentlyPlaying } = useSongContext();

  // React.useEffect(() => {
  //   // bukAddPlaylist(data);
  //   //eslint-disable-next-line
  // }, []);

  return (
    <div>
      <List>
        {data.map(s => {
          return (
            <React.Fragment key={`${s.id}-favorites${Math.random()}`}>
              <ListItem>
                <ListItemText>{`${s.name}`}</ListItemText>
                <IconButton
                  onClick={() => playAudio(s)}
                  disabled={s.id === currentlyPlaying.id}
                >
                  {s.id === currentlyPlaying.id ? (
                    <Pause />
                  ) : (
                    <PlayArrow titleAccess="Play" />
                  )}
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
};

export default FavoriteList;
