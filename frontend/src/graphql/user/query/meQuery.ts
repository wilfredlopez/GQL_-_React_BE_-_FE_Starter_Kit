import { gql } from "apollo-boost";
import { UserFragment } from "../../fragments/userFragment";

export const meQuery = gql`
  query Me {
    me {
      ...UserFragment
    }
  }
  ${UserFragment.UserFragment}
`;
