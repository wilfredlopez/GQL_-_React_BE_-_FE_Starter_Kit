import React from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { useMeQuery } from "../../generated/apolloComponents";
import { BigSpinner } from "../shared/BigSpinner";

interface MyProps {}
type IProps = RouteComponentProps<MyProps>;

const WithAuthVerify: React.FunctionComponent<IProps> = props => {
  const path = props.location!.pathname || "/login";
  const { data, loading } = useMeQuery();

  const redirectBack = (
    <Redirect
      to={{
        pathname: "/login",
        state: {
          next: path
        }
      }}
    />
  );

  if (loading) {
    return <BigSpinner></BigSpinner>;
  }

  if (data && !data.me) {
    return redirectBack;
  }

  if (data && data.me) {
    return <React.Fragment>{props.children}</React.Fragment>;
  } else {
    return redirectBack;
  }
};

export default withRouter(WithAuthVerify);
