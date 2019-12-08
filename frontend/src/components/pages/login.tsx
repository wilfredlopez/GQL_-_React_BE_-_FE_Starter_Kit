import React, { useEffect } from "react";
import LoginForm from "../content/login/loginForm";
import { RouteComponentProps } from "react-router";
import { useQuery } from "react-apollo";
import {
  MeQueryResult,
  MeQueryVariables
} from "../../generated/apolloComponents";
import { meQuery } from "../../graphql/user/query/meQuery";
import { CircularProgress } from "@material-ui/core";
import PageHead from "../shared/pageHead";

interface Props extends RouteComponentProps {}

const Login: React.FC<Props> = props => {
  const meData = useQuery<MeQueryResult, MeQueryVariables>(meQuery);

  const { state } = props.location;
  const { push } = props.history;
  useEffect(() => {
    if (!meData.loading && meData.data) {
      const { me }: any = meData.data;
      if (me) {
        if (state && state.next) {
          //redirects to the previews page that user was located at
          push(state.next);
        } else {
          //if no previews page was found then redirects to add-product page
          push("/account");
        }
      }
    }
  }, [meData, push, state]);

  const staticContent = <PageHead title="Login" />;

  if (meData.loading) {
    return (
      <div>
        {staticContent}
        <CircularProgress variant="determinate" />
      </div>
    );
  }

  return (
    <div>
      {staticContent}
      <LoginForm {...props} />
    </div>
  );
};

export default Login;
