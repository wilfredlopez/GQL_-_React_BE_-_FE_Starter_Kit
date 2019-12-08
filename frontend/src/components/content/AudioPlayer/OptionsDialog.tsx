import { Fab } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import {
  PlaylistPlay,
  // Save,
  PlayArrow
} from "@material-ui/icons";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import useSongContext from "../../../context/useSongContext";
import playerStyles from "./playerStyles";
export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const classes = playerStyles();
  const { onClose, open } = props;
  const {
    playlist,
    playAudio,
    deleteFromPlaylist,
    playTrack
  } = useSongContext();

  const handleClose = () => {
    onClose();
  };

  function handleSaveClick() {
    //TODO
    playTrack(0);
    onClose();
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="playlist-dialog"
      open={open}
      fullWidth
    >
      <DialogTitle id="playlist-dialog">Playlist</DialogTitle>
      <List>
        {playlist.map((s, i) => (
          // <div key={s.id} className={classes.listContainerDiv} id={s.id}>
          <ListItem
            button
            // onClick={() => playAudio(s)}
            disableGutters
            style={{
              padding: 10
            }}
            key={`${s.id}-${i}`}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar} src={s.imageUrl}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${s.name.substring(0, 25)}...`}
              onClick={() => playAudio(s)}
            />
            {/* <Chip
              variant="outlined"
              label="Delete"
              onDelete={() => {
                deleteFromPlaylist(s.id);
              }}
              className={classes.deleteBTN}
              clickable
              color="primary"
            /> */}
            <IconButton
              onClick={() => {
                deleteFromPlaylist(s.id);
              }}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </ListItem>
          // </div>
        ))}
        {playlist.length === 0 ? (
          <div className={classes.emptyList}>
            <ListItemText primary={`Your Playlist Is Empty`} />
          </div>
        ) : (
          <ListItem autoFocus button onClick={() => handleSaveClick()}>
            <ListItemAvatar>
              <Avatar>
                {/* <Save color="primary" /> */}
                <PlayArrow color="primary" />
              </Avatar>
            </ListItemAvatar>
            {/* <ListItemText primary="Save" /> */}
            <ListItemText primary="Play All" />
          </ListItem>
        )}
      </List>
    </Dialog>
  );
}

export default function OptionsDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab onClick={handleClickOpen} size="small" variant="extended">
        <PlaylistPlay />
      </Fab>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
