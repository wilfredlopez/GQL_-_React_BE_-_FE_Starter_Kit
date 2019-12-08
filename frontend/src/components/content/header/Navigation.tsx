import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React, { Fragment } from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import config from "../../../config";
import { useMeQuery } from "../../../generated/apolloComponents";
import { useStyles } from "./HeaderUseStyles";
import {
  DrawerSide,
  MenuSideList,
  ToggleDrawerFunction
} from "./parts/MenuSideList";
import UserOrLoginContent from "./parts/UserOrLoginContent";
import SearchInputBase from "./searchInputBase";

interface TopMenuProps extends RouteComponentProps {}

const TopMenu = (props: TopMenuProps) => {
  const classes = useStyles();
  const [drawerSide, setDrawerSide] = React.useState<DrawerSide>("left");
  const [drawerOpen, setDrowerOpen] = React.useState<boolean>(false);

  const me = useMeQuery({});

  const toggleDrawer: ToggleDrawerFunction = (
    side: DrawerSide,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerSide(side);
    setDrowerOpen(open);
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="sticky">
          <Container>
            <Toolbar disableGutters={true}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="Open drawer"
                onClick={toggleDrawer(drawerSide, true)}
              >
                <Menu />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                <NavLink to="/" className={classes["wilfred-brand"]}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {config.siteShortName}
                    <img
                      src="/android-chrome-512x512.png"
                      style={{}}
                      width={50}
                      alt="VapeMusic Logo"
                    />
                  </div>
                </NavLink>
              </Typography>

              <SearchInputBase
                rootClass={classes.inputRoot}
                inputClass={classes.inputInput}
              />

              {me.data && me.data.me && me.data.me.name ? (
                <UserOrLoginContent username={me.data.me.name.split(" ")[0]} />
              ) : (
                <UserOrLoginContent />
              )}
            </Toolbar>
          </Container>
        </AppBar>
        <MenuSideList
          toggleDrawer={toggleDrawer}
          side={drawerSide}
          open={drawerOpen}
        />
      </div>
    </Fragment>
  );
};

export default withRouter(TopMenu);
