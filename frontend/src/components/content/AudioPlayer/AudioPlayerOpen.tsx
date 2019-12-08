import {
  Button,
  Card,
  CardActions,
  Container,
  Divider,
  Grid
} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { Pause, PlayArrow, VolumeMute, VolumeOff } from "@material-ui/icons";
import React from "react";
import useSongContext from "../../../context/useSongContext";
import OptionsDialog from "./OptionsDialog";
import playerStyles from "./playerStyles";

interface Props {
  disableNext: boolean;
  disablePrev: boolean;
  muted: boolean;
  toggleMute: () => void;
  handleTogglePlaying: () => void;
  currentAudioTime: string;
}

export const AudioPlayerOpen: React.FC<Props> = ({
  disableNext,
  disablePrev,
  muted,
  toggleMute,
  handleTogglePlaying,
  currentAudioTime
}) => {
  const {
    currentlyPlaying,
    playPreviousTrack,
    playNextTrack
  } = useSongContext();
  const classes = playerStyles();

  const { isPlaying } = currentlyPlaying;
  //   const [audio, state, controls, ref] = useAudio({
  //     src: url,
  //     autoPlay: false,
  //     loop: false,
  //     "aria-label": currentlyPlaying.name
  //   });

  //   const { play } = controls;
  //   const [muted, setMuted] = useState(false);
  //   const percentRef = useRef("0");
  //   let disablePrev = currentIndex === 0 || playlist.length === 0;

  //   //   useEffect(() => {
  //   //     disablePrev = currentIndex === 0 || playlist.length === 0;
  //   //   }, [playlist]);

  //   useEffect(() => {
  //     if (isPlaying) {
  //       play();
  //     }

  //     // console.log(state);
  //   }, [play, isPlaying]);

  //   useLayoutEffect(() => {
  //     const theref = ref;
  //     if (theref && theref.current && theref.current.currentTime) {
  //       if (theref.current.currentTime === state.duration) {
  //         playNextTrack();
  //       }
  //     }
  //   }, [playNextTrack, ref, state.duration]);

  //   function toggleMute() {
  //     if (muted) {
  //       controls.unmute();
  //       setMuted(false);
  //     } else {
  //       controls.mute();
  //       setMuted(true);
  //     }
  //   }

  //   function handleTogglePlaying() {
  //     if (isPlaying) {
  //       controls.pause();
  //       togglePlaying(false);
  //     } else {
  //       controls.play();
  //       togglePlaying(true);
  //     }
  //   }

  //   useLayoutEffect(() => {
  //     let totalPercent = fmtMSS(state.time); //(state.time / state.duration) * 100;
  //     percentRef.current = totalPercent;
  //   }, [state.time]);

  //   // const durationTotal = fmtMSS(state.duration);
  //   const lastSong = playlist[playlist.length - 1];

  //   const disableNext =
  //     currentIndex === playlist.length - 1 || currentlyPlaying.id === lastSong.id;

  return (
    <Container fixed draggable className={classes.myContainer} maxWidth="sm">
      <Card>
        <Grid
          container
          justify="flex-end"
          alignContent="center"
          direction="column"
        >
          {/* <Grid item> */}
          <Fab
            color="primary"
            variant="extended"
            aria-label="Play/Pause"
            className={classes.fab}
            size="large"
            onClick={() => handleTogglePlaying()}
          >
            {/* <div>{audio}</div> */}

            {!isPlaying ? (
              <PlayArrow className={classes.extendedIcon} />
            ) : (
              <Pause className={classes.extendedIcon} />
            )}
            <p className={classes.para}>
              {currentlyPlaying.name.length > 40
                ? currentlyPlaying.name.substring(0, 40)
                : currentlyPlaying.name}
              ...
            </p>
          </Fab>
          {/* </Grid> */}
          {/* <CardActionArea disableRipple> */}
          <CardActions>
            <div style={{ width: 20 }} id="wl-audio-player_current-time">
              <p>{currentAudioTime}</p>
              {/* {state.duration && state.duration > 0 && <p>{durationTotal}</p>} */}
            </div>
            <Divider variant="middle" />
            <Fab
              variant="extended"
              size="small"
              onClick={() => {
                toggleMute();
              }}
            >
              {muted ? <VolumeOff /> : <VolumeMute />}
            </Fab>
            <OptionsDialog />
            <div style={{ display: "flex" }}>
              <Button
                variant="outlined"
                disabled={disablePrev}
                onClick={() => playPreviousTrack()}
              >
                PREV
              </Button>
              <Button
                variant="outlined"
                onClick={playNextTrack}
                disabled={disableNext}
              >
                NEXT
              </Button>
              <Divider
                variant="middle"
                style={{
                  width: 28,
                  background: "transparent"
                }}
              />
            </div>
          </CardActions>
          {/* </CardActionArea> */}
        </Grid>
      </Card>
    </Container>
  );
};
