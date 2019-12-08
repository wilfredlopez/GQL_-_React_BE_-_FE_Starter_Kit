// import { isBrowser } from "../lib/isBrowser"
import React from "react";

// import SearchComponent from "../components/searchComponent/SearchComponent"

import PageHead from "../shared/pageHead";
import SearchContent from "../content/search/SearchContent";
import { RouteComponentProps } from "react-router";

export interface ISearchProps extends RouteComponentProps<{ query: string }> {}

//WITH LAZY LOADING

const Search: React.FC<ISearchProps> = (props: ISearchProps) => {
  const { query } = props.match.params;

  //   React.useEffect(() => {
  //     console.log(props.match.params.query);
  //     const term = props.location.search.substr(7);
  //     console.log(term);
  //   }, [props]);
  return (
    <div>
      <PageHead title={`Search Resutls - ${query}`} />
      <SearchContent query={query} initialLimit={6} />
    </div>
  );
};

// Search.getInitialProps = async ({
//   query: { query },
//   apolloClient,
//   ...ctx
// }: MyContext) => {
//   return { query } as any
// }

export default Search;
