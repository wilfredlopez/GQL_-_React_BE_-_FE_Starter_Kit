import { gql } from "apollo-boost";

export const changeThemeMutation = gql`
  mutation ChangeThemeMutation($themeMode: String!) {
    changeTheme(themeMode: $themeMode)
  }
`;
