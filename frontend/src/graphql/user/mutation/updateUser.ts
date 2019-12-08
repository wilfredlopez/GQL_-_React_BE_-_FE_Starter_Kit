import { gql } from "apollo-boost";

export const updateUser = gql`
  mutation UpdateUser(
    $email: String!
    $lastName: String!
    $firstName: String!
  ) {
    updateUser(
      userInput: { email: $email, firstName: $firstName, lastName: $lastName }
    )
  }
`;
