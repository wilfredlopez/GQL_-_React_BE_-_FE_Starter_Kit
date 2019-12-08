import { Button, Container, Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { PlayArrow, Settings } from "@material-ui/icons";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import { SongContextPlaylist } from "../../../context/songContext";
import { ThemeContext } from "../../../context/themeContext";
import useSongContext from "../../../context/useSongContext";
import {
  MeQueryResult,
  useChangeThemeMutationMutation
} from "../../../generated/apolloComponents";
import EditAccount from "./EditAccount";
import FavoriteList from "./FavoriteList";
import TabPanel from "./tabPannel";
import { ThemeModeType } from "../../../theme";

function a11yProps(index: any) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper
  }
}));

interface AccountContentProps extends RouteComponentProps {
  me: MeQueryResult;
  userPlaylist: SongContextPlaylist[];
}

const AccountContent = (props: AccountContentProps) => {
  const { changeTheme: setTheme, themeMode } = useContext(ThemeContext);

  let playAllLikeRef = useRef<boolean>(false);

  const me = props.me;

  const [localUserPlaylist, setLocalUserPlaylist] = useState<
    SongContextPlaylist[]
  >([]);

  const { playAudio, bukAddPlaylist } = useSongContext();

  useEffect(() => {
    if (!props.userPlaylist) {
      setLocalUserPlaylist(props.userPlaylist);
    }
  }, [props.userPlaylist]);

  React.useEffect(() => {
    if (localUserPlaylist.length > 0) {
      bukAddPlaylist(localUserPlaylist);
    }
    //eslint-disable-next-line
  }, [localUserPlaylist]);

  // const { playlist } = useSongContext();

  const push = props.history.push;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [changeThemeMutation] = useChangeThemeMutationMutation();
  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  const handlePlayAllLiked = () => {
    if (!playAllLikeRef.current) {
      playAudio(localUserPlaylist[0]);
      playAllLikeRef.current = true;
    }
  };

  const handleSetTheme = (theme: ThemeModeType) => {
    changeThemeMutation({
      variables: {
        themeMode: theme
      }
    }).then(() => {
      setTheme(theme);
    });
  };

  if (me && me.data) {
    return (
      <Container maxWidth="md">
        <br />
        <br />
        <div className="d-flex flex-between">
          <div>
            <h1 style={{ textTransform: "uppercase" }}>Account</h1>
          </div>
          {me.data.me && me.data.me.admin === true && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => push("/dashboard")}
            >
              Dashboard
            </Button>
          )}

          <Button
            variant="outlined"
            color="default"
            // style={{ color: "#c61717" }}
            href="/logout"
          >
            Logout
          </Button>
        </div>
        <hr />
        <div>{me.data.me && <h1>Hi {me.data.me.firstName}!</h1>}</div>

        {me.data.me && (
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                // variant="scrollable"
                scrollButtons="off"
                aria-label="scrollable prevent tabs example"
                centered
                style={{ justifyContent: "center", display: "flex" }}
              >
                <Tab
                  icon={<FavoriteIcon />}
                  label="Liked"
                  aria-label="liked"
                  {...a11yProps(0)}
                />
                <Tab
                  icon={<PersonPinIcon />}
                  label="Edit Account"
                  aria-label="Edit Account"
                  {...a11yProps(1)}
                />

                <Tab
                  icon={<Settings />}
                  label="Settings"
                  aria-label="configuracion"
                  {...a11yProps(2)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <div>
                <Grid container justify="space-between" direction="column">
                  <h2>Liked</h2>
                  {localUserPlaylist.length > 0 && (
                    <React.Fragment>
                      <Grid item>
                        <Button
                          fullWidth
                          disabled={playAllLikeRef.current}
                          style={{
                            height: "40px",
                            margin: "auto"
                          }}
                          variant="outlined"
                          size="small"
                          color="secondary"
                          onClick={handlePlayAllLiked}
                        >
                          Play All Liked
                          <PlayArrow />
                        </Button>
                      </Grid>
                      <Grid item>
                        <FavoriteList data={localUserPlaylist} />
                      </Grid>
                    </React.Fragment>
                  )}
                </Grid>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div>
                <h2>Edit My Account</h2>

                {me.data.me.lastName && me.data.me.firstName && (
                  <EditAccount
                    firstName={me.data.me.firstName}
                    lastName={me.data.me.lastName}
                    email={me.data.me.email}
                    id={me.data.me.id}
                  />
                )}
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <h2>Configuracion</h2>

              <div className="d-flex flex-center p2">
                <p className="m-auto">Dark Theme</p>
                <input
                  style={{ width: "25px", height: "25px" }}
                  type="checkbox"
                  checked={themeMode === "dark"}
                  onChange={() => {}}
                  onClick={() =>
                    themeMode === "light"
                      ? handleSetTheme("dark")
                      : handleSetTheme("light")
                  }
                />
              </div>
            </TabPanel>
          </div>
        )}
        <br />
        <br />
      </Container>
    );
  } else {
    return <div>Please Login to Continue</div>;
  }
};

export default AccountContent;
