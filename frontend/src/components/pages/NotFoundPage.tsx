import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import PageHead from "../shared/pageHead";

interface Props extends RouteComponentProps {}

export const NotFoundPage: React.FC<Props> = props => {
  useEffect(() => {
    props.history.push("/");
  }, [props.history]);

  return (
    <div>
      <PageHead title="Page Not Found" />
      <div>Page Not Found</div>
    </div>
  );
};
