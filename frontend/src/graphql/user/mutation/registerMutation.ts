import gql from "graphql-tag";
import { UserFragment } from "../../fragments/userFragment";

export const registerMutation = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    register(
      userData: {
        email: $email
        password: $password
        firstname: $firstName
        lastname: $lastName
      }
    ) {
      ...UserFragment
    }
  }
  ${UserFragment.UserFragment}
`;
