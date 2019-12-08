import React, { useEffect } from "react";

import { RouteComponentProps } from "react-router-dom";
import {
  useLogoutMutationMutation,
  MeQuery
} from "../../generated/apolloComponents";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { meQuery } from "../../graphql/user/query/meQuery";

interface Props extends RouteComponentProps {}

const Logout: React.FC<Props> = props => {
  const [logout, { client }] = useLogoutMutationMutation();

  useEffect(() => {
    async function logoutAndRedirect() {
      await logout({
        awaitRefetchQueries: true
      });
      //JWT AUTH METHOD
      localStorage.removeItem(ACCESS_TOKEN);

      localStorage.removeItem(REFRESH_TOKEN);
      //END JWT AUTH METHOD

      if (client) {
        await client.clearStore();
        await client.resetStore();
        client.cache.reset();
        client.writeQuery<MeQuery>({
          query: meQuery,
          data: {
            __typename: "Query",
            me: null
          }
        });
      }

      props.history.push("/");
    }
    logoutAndRedirect();
  }, [props.history, logout, client]);
  return <div>LOGOUT</div>;
};

export default Logout;
