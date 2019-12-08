import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";

interface Props {
  username?: string;
}

const UserOrLoginContent: React.FC<Props> = ({ username }) => {
  let userContent = (
    <div
      style={
        {
          // marginLeft: "0.5rem"
        }
      }
    >
      <NavLink to="/login" style={{ textDecoration: "none" }}>
        <Button
          style={{ color: "white", marginLeft: "0.4rem", marginRight: 0 }}
          variant="outlined"
        >
          Login
        </Button>
      </NavLink>
    </div>
  );

  if (username) {
    userContent = (
      <div>
        <NavLink to="/account" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            style={{ color: "white", marginLeft: "0.4rem", marginRight: 0 }}
          >
            {username}
          </Button>
        </NavLink>
      </div>
    );
  }

  return userContent;
};

export default UserOrLoginContent;
