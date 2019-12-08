import { Container, Fab, Grid, Hidden } from "@material-ui/core";
import { Minimize, PlaylistPlay } from "@material-ui/icons";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAudio } from "react-use";
import useSongContext from "../../../context/useSongContext";
import { turnSecondsToMinutes } from "../../../utils/utililtyFunctions";
import { AudioPlayerOpen } from "./AudioPlayerOpen";
import playerStyles from "./playerStyles";

interface Props {}

export const AudioPlayer: React.FC<Props> = () => {
  const classes = playerStyles();
  const [open, setOpen] = useState<boolean>(true); //trying as open by default so users know that player is there

  const {
    currentlyPlaying,
    playlist,
    playNextTrack,
    togglePlaying,
    currentIndex
  } = useSongContext();

  const { url, isPlaying } = currentlyPlaying;
  const [audio, state, controls, ref] = useAudio({
    src: url,
    autoPlay: false,
    loop: false,
    "aria-label": currentlyPlaying.name
  });

  const { play } = controls;
  const [muted, setMuted] = useState(false);
  const percentRef = useRef("0");
  let disablePrev = currentIndex === 0 || playlist.length === 0;

  //   useEffect(() => {
  //     disablePrev = currentIndex === 0 || playlist.length === 0;
  //   }, [playlist]);

  useEffect(() => {
    if (isPlaying) {
      play();
    }

    // console.log(state);
  }, [play, isPlaying]);

  useLayoutEffect(() => {
    if (ref) {
      const theref = ref;
      if (theref && theref.current && theref.current.currentTime) {
        if (theref.current.currentTime === state.duration) {
          playNextTrack();
        }
      }
    }

    //eslint-disable-next-line
  }, [playNextTrack, state.duration]);

  function toggleMute() {
    if (muted) {
      controls.unmute();
      setMuted(false);
    } else {
      controls.mute();
      setMuted(true);
    }
  }

  const handleTogglePlaying = () => {
    if (isPlaying) {
      controls.pause();
      togglePlaying(false);
    } else {
      controls.play();
      togglePlaying(true);
    }
  };
  function toggleOpen() {
    setOpen(o => !o);
  }

  useLayoutEffect(() => {
    if (percentRef) {
      let totalPercent = turnSecondsToMinutes(state.time); //(state.time / state.duration) * 100;
      percentRef.current = totalPercent;
    }
  }, [state.time]);

  // const durationTotal = fmtMSS(state.duration);
  const lastSong = playlist[playlist.length - 1];

  const disableNext =
    currentIndex === playlist.length - 1 || currentlyPlaying.id === lastSong.id;

  //END NEW

  const outerFabClass = open ? classes.fabActive : classes.fab;
  return (
    <Container fixed draggable className={classes.outcontainer} maxWidth="sm">
      <Hidden implementation="css" xsUp={!open}>
        <AudioPlayerOpen
          toggleMute={toggleMute}
          currentAudioTime={percentRef.current}
          handleTogglePlaying={handleTogglePlaying}
          muted={muted}
          disableNext={disableNext}
          disablePrev={disablePrev}
        />
      </Hidden>

      <Fab
        className={outerFabClass}
        color="secondary"
        variant="extended"
        disableFocusRipple
        // variant="extended"
        size="large"
        onClick={() => {
          toggleOpen();
        }}
      >
        <span>
          <span>{audio}</span>
          {open ? (
            <Minimize fontSize="large" className={classes.minimizeIcon} />
          ) : (
            // <Audiotrack className={classes.trackIcon} fontSize="small" />
            <MyAudioIcon className={classes.trackIcon} />
          )}
        </span>
      </Fab>
    </Container>
  );
};

interface MyIconProps {
  className: string;
}

const MyAudioIcon: React.FC<MyIconProps> = props => {
  return (
    <Grid
      container
      alignContent="center"
      justify="center"
      className={props.className}
      style={{ background: "transparent", color: "inherit" }}
    >
      <PlaylistPlay fontSize={"large"} color="inherit" />
    </Grid>
  );
};
