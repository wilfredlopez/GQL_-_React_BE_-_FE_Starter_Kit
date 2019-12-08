import React, { useContext } from "react";
import {
  Home,
  Whatshot,
  SortByAlpha,
  ContactMail,
  MonetizationOn,
  Album as AlbumIcon,
  Info
} from "@material-ui/icons";

import {
  useChangeThemeMutationMutation,
  useMeQuery
} from "../../../../generated/apolloComponents";
import { ThemeContext } from "../../../../context/themeContext";
import { ThemeModeType } from "../../../../theme";
import { NavLink } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  List
} from "@material-ui/core";
import { useMenuSideListStyles } from "./MenuSideListStyles";

export type DrawerSide = "top" | "left" | "bottom" | "right";
export type ToggleDrawerFunction = (
  side: DrawerSide,
  open: boolean
) => (event: React.KeyboardEvent | React.MouseEvent) => void;

interface Props {
  toggleDrawer: ToggleDrawerFunction;
  side: DrawerSide;
  open: boolean;
}

interface secondMenuOptionsType {
  label: string;
  link: string;
  icon?: undefined | JSX.Element;
}

const categorias = [
  { label: "Home", link: "/", icon: <Home color="secondary" /> },
  { label: "Hot Now", link: "/songs/hot", icon: <Whatshot color="action" /> },
  { label: "Reggaeton", link: "/genre/reggaeton" },
  { label: "All Artists", link: "/artists", icon: <SortByAlpha /> }
];

const secondMenuOptions: secondMenuOptionsType[] = [
  { label: "Contact", link: "/contact", icon: <ContactMail /> },
  { label: "Contribute", link: "/contribute", icon: <MonetizationOn /> }
];

export const MenuSideList: React.FC<Props> = props => {
  const me = useMeQuery();
  const classes = useMenuSideListStyles();
  const { themeMode, changeTheme } = useContext(ThemeContext);

  const [changeThemeMutation] = useChangeThemeMutationMutation();

  const setTheme = (name: ThemeModeType) => {
    changeTheme(name);
  };

  const handleSetTheme = (theme: ThemeModeType) => {
    if (me.data && me.data.me && me.data.me.id) {
      changeThemeMutation({
        variables: {
          themeMode: theme
        }
      }).then(() => {
        setTheme(theme);
      });
    } else {
      setTheme(theme);
    }
  };

  const sideList = (side: DrawerSide) => (
    <nav
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer(side, false)}
      onKeyDown={props.toggleDrawer(side, false)}
    >
      <List>
        {categorias.map((item, index) => (
          <NavLink
            to={item.link}
            exact={true}
            activeClassName="inicio"
            className={classes["wilfred-link"]}
            key={index + item.link}
          >
            <ListItem button alignItems="center">
              <ListItemIcon>
                {item.icon ? (
                  item.icon
                ) : (
                  <AlbumIcon className={classes.albumColor} />
                )}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        {secondMenuOptions.map((item, index) => (
          <NavLink
            to={item.link}
            exact={true}
            activeClassName="inicio"
            className={classes["wilfred-link"]}
            key={index + item.label}
          >
            <ListItem button key={index}>
              <ListItemIcon>
                {item.icon ? item.icon : <Info color="secondary" />}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        <div className={classes["wilfred-link"]}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "1rem"
            }}
          >
            <p>Dark Theme</p>
            <input
              className={classes.selectTheme}
              style={{
                width: "25px",
                height: "25px",
                cursor: "grab"
              }}
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
        </div>
      </List>
    </nav>
  );

  return (
    <Drawer
      open={props.open}
      onClose={props.toggleDrawer(props.side, false)}
      anchor={props.side}
    >
      {sideList(props.side)}
    </Drawer>
  );
};
