import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useQuery } from "react-apollo";
import {
  MeQueryResult,
  MeQueryVariables
} from "../../generated/apolloComponents";
import { meQuery } from "../../graphql/user/query/meQuery";
import { CircularProgress } from "@material-ui/core";
import RegisterForm from "../content/login/registerForm";
import PageHead from "../shared/pageHead";

interface Props extends RouteComponentProps {}

const Register: React.FC<Props> = props => {
  const meData = useQuery<MeQueryResult, MeQueryVariables>(meQuery);

  //   const { state } = props.location;
  const { push } = props.history;
  useEffect(() => {
    if (!meData.loading && meData.data) {
      const { me }: any = meData.data;
      if (me) {
        push("/account");
      }
    }
  }, [meData, push]);
  const staticContent = <PageHead title="Register" />;

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
      <RegisterForm {...props} />
    </div>
  );
};

export default Register;
