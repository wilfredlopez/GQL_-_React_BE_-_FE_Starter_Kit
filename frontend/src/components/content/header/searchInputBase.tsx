import * as React from "react";

import { InputBase } from "@material-ui/core";
import styled from "@material-ui/styles/styled/styled";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
// import redirect from "../../lib/redirect"

export interface ISearchInputBaseProps extends RouteComponentProps {
  inputClass?: string | undefined;
  rootClass?: string | undefined;
}

const FancyButton = styled("button")({
  backgroundColor: "#e3e3e3",
  height: 35,
  border: "none",
  boxShadow:
    "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
  cursor: "pointer",
  textTransform: "uppercase",
  display: "inherit",
  alignItems: "inherit",
  justifyContent: "inherit",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  fontWeight: 500,
  lineHeight: 1.75,
  transition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  "&:hover": {
    backgroundColor: "#c8c8c8",
    color: "black"
  }
});

const SearchInputBase: React.FunctionComponent<ISearchInputBaseProps> = ({
  rootClass,
  inputClass,
  history
}) => {
  const [query, setQuery] = React.useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setQuery(e.target.value);
  };

  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    const q = query;
    if (q !== "") {
      setQuery(() => "");
      // redirect(null, `/search?query=${q}`)

      history.push(`/search/${q}`);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        color: "black",
        flexGrow: 1,
        width: "auto"
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <InputBase
          placeholder="Search..."
          classes={{
            root: rootClass,
            input: inputClass
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
          value={query}
          onKeyPress={e => {
            return e.key === "Enter" ? handleClick(e) : undefined;
          }}
          endAdornment={
            <div>
              <FancyButton onClick={handleClick}>Search</FancyButton>
            </div>
          }
        />
        {/* <FancyButton onClick={handleClick}>Search</FancyButton> */}
      </div>
    </div>
  );
};

export default withRouter(SearchInputBase);
