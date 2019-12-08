import { gql } from "apollo-boost";
import { UserFragment } from "../../fragments/userFragment";

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginData: { email: $email, password: $password }) {
      ...UserFragment
    }
  }
  ${UserFragment.UserFragment}
`;
