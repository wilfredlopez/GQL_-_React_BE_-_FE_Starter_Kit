import React from "react";
import SongSquare from "../../content/songs/SongSquare";
import { RouteComponentProps } from "react-router-dom";
import { Container, Breadcrumbs } from "@material-ui/core";
import CustomRouterLink from "../../shared/CustomRouterLink";
import PageHead from "../../shared/pageHead";
import useSongContext from "../../../context/useSongContext";

export interface ISongProps extends RouteComponentProps<{ id: string }> {}

const SongId: React.FC<ISongProps> = (props: ISongProps) => {
  const { id } = props.match.params;

  const { playlist } = useSongContext();

  if ("data && data.getSongByid") {
    return (
      <React.Fragment>
        <PageHead title={"data.getSongByid.name"} />
        <Container>
          <br />
          <Breadcrumbs style={{ marginLeft: 29, color: "grey" }}>
            <CustomRouterLink href="/">Music</CustomRouterLink>

            <CustomRouterLink
              href={`/genre/${"data.getSongByid.genre".toLowerCase()}`}
            >
              {"data.getSongByid.genre"}
            </CustomRouterLink>
            <p>{"TITLE"}</p>
          </Breadcrumbs>
          <br />

          <SongSquare s={playlist[0]} />
        </Container>
      </React.Fragment>
    );
  } else {
    return <div></div>;
  }
};

export default SongId;
