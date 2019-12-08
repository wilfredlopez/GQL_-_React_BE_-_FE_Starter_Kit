import { Typography, Button } from "@material-ui/core";
import * as React from "react";
import useSongContext from "../../context/useSongContext";
import SongContent from "../content/songs/SongContent";
import PageHead from "../shared/pageHead";
import { BigSpinner } from "../shared/BigSpinner";
import Promoted from "../content/songs/Promoted";
import { SongContextPlaylist } from "../../context/songContext";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = props => {
  const {
    //  bukAddPlaylist,
    playlist
  } = useSongContext();

  // const staticLimit = 8;

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<SongContextPlaylist[]>([]);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(playlist);
    }, 1000);
  }, [playlist]);

  if (loading) {
    return <BigSpinner />;
  }

  const staticContent = (
    <React.Fragment>
      <Promoted />
      <PageHead title="Most Recent Music" />
      <div className="p2">
        <Typography variant="h4" component="h1" align="center">
          Most Recent Music
        </Typography>
      </div>
    </React.Fragment>
  );

  if (data) {
    return (
      <div>
        <br />

        {staticContent}
        <SongContent Songs={data} />
        <div className="flex-center p2">
          <Button
            variant="contained"
            color="secondary"
            disabled={data.length === playlist.length}
            onClick={() => {
              //LOGIC HERE
            }}
          >
            Load More
          </Button>
        </div>
      </div>
    );
  } else {
    return staticContent;
  }
};

export default Index;
