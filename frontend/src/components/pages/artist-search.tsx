// import { isBrowser } from "../lib/isBrowser"
import React from "react";

// import SearchComponent from "../components/searchComponent/SearchComponent"

import PageHead from "../shared/pageHead";
import SearchContent from "../content/search/SearchContent";
import { RouteComponentProps } from "react-router";

export interface IArtistSearchProps
  extends RouteComponentProps<{ query: string }> {}

//WITH LAZY LOADING
const ArtistSearch: React.FC<IArtistSearchProps> = (
  props: IArtistSearchProps
) => {
  const { query } = props.match.params;

  return (
    <div>
      <PageHead title={`${query.toUpperCase()}`} />
      <SearchContent query={query} initialLimit={14} />
    </div>
  );
};

export default ArtistSearch;
