import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Chip,
  Badge
} from "@material-ui/core";
import * as React from "react";
import { useMeQuery } from "../../../generated/apolloComponents";
import { CloudDownload, Favorite, DeleteForever } from "@material-ui/icons";
import { Link } from "react-router-dom";
import useSongContext from "../../../context/useSongContext";
import { SongSquareStyles } from "./SongSquareStyles";
import { SongContextPlaylist } from "../../../context/songContext";

interface ISongSquareProps {
  s: SongContextPlaylist;
}

type FavColor = "action" | "disabled";

const SongSquare: React.FunctionComponent<ISongSquareProps> = ({ s }) => {
  const {
    playAudio,
    currentlyPlaying,
    deleteFromPlaylist
    // addToPlaylist
  } = useSongContext();

  const classes = SongSquareStyles();

  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [favColor, setFavColor] = React.useState<FavColor>("disabled");
  const me = useMeQuery();

  const { data } = me;

  const thisSongId = s.id;

  React.useEffect(() => {
    if (data && data.me) {
      if (data.me.admin === true) {
        setIsAdmin(true);
      }
    }
  }, [data]);

  const handleDeleteClick = () => {
    //Delete song from Database
    deleteFromPlaylist(thisSongId);
  };

  const handleLikeClick = async () => {
    if (favColor === "action") {
      setFavColor("disabled");
    } else {
      setFavColor("action");
    }
  };

  const handleaddSongViewClick = () => {
    //login here
  };

  return (
    <Card raised style={{ marginBottom: 20 }}>
      <Grid
        container
        justify="space-evenly"
        alignItems="center"
        direction="column"
      >
        <br />
        <Grid item>
          <Link to={`/song/${s.id}`}>
            <Badge
              badgeContent={
                <Chip
                  label={`${0} Plays`}
                  clickable={false}
                  variant="outlined"
                  title={`${0} Plays`}
                  className={classes.playsChip}
                />
              }
              className={classes.playsBadge}
            >
              <CardMedia
                image={s.imageUrl}
                title={s.name}
                className={classes.imageContent}
              />
            </Badge>
          </Link>
        </Grid>
        <Grid item>
          <br />
          <Typography align="center">{s.name}</Typography>
          <br />
          <CardActions className={classes.wCardActions}>
            <Badge
              badgeContent={"HOT!"}
              color="primary"
              invisible={true}
              className={classes.hotBatch}
            >
              <Button
                disabled={currentlyPlaying.id === s.id}
                variant="outlined"
                color="secondary"
                title="Play"
                onClick={() => {
                  playAudio({
                    id: s.id,
                    isPlaying: false,
                    name: s.name,
                    url: s.url,
                    imageUrl: s.imageUrl
                  });
                  handleaddSongViewClick();
                }}
              >
                Play
              </Button>
            </Badge>
            {/* <Button
              // style={{
              //   color: "#fa6b60"
              // }}
              // color="inherit"
              variant="outlined"
              title="Add To Playlist"
              onClick={() =>
                addToPlaylist({
                  id: s.id,
                  imageUrl: s.imageUrl,
                  isPlaying: false,
                  name: s.name,
                  url: s.audioUrl
                })
              }
            >
              Add
            </Button> */}
            <Button
              variant="outlined"
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Download"
            >
              <CloudDownload />
            </Button>
            <IconButton title="Like" onClick={handleLikeClick}>
              <Favorite color={favColor} />
            </IconButton>

            {isAdmin && (
              <React.Fragment>
                {/* <div className="flex-between m-auto"> */}
                <IconButton title="Delete" onClick={() => handleDeleteClick()}>
                  <DeleteForever />
                </IconButton>
                <IconButton
                  title="Delete"
                  color="secondary"
                  href={`/edit/${s.id}`}
                  size="small"
                >
                  <p style={{ margin: "0.5rem auto" }}>Edit</p>
                </IconButton>
                {/* </div> */}
              </React.Fragment>
            )}
            <br />
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default React.memo(SongSquare);
