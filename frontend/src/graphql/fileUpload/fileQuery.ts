import gql from "graphql-tag";

export const filesQuery = gql`
  query Files {
    files {
      name
      link
    }
  }
`;
