import React from "react";
import { Paper, Grid } from "@material-ui/core";
import CustomRouterLink from "../../shared/CustomRouterLink";

interface Props {
  list: string[];
}

const ArtistsList: React.FC<Props> = ({ list }) => {
  return (
    <Paper style={{ paddingLeft: 12, paddingRight: 12 }}>
      <Grid container spacing={6}>
        {list.sort().map(ar => {
          return (
            <Grid item key={`${ar}_artist-list`}>
              {" "}
              <CustomRouterLink href={`/artist-search/${ar}`}>
                {ar.toUpperCase()}
              </CustomRouterLink>
              {/* <a href={`/search/${ar}`}>{ar} </a> */}
            </Grid>
          );
        })}
        <br />
      </Grid>
    </Paper>
  );
};

export default ArtistsList;
