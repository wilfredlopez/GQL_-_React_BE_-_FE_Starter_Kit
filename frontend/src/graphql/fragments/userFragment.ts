import gql from "graphql-tag";

export const UserFragment = {
  UserFragment: gql`
    fragment UserFragment on User {
      name
      avatar
      id
      email
      admin
      firstName
      lastName
      accessToken
      refreshToken
      themeMode
    }
  `
};
