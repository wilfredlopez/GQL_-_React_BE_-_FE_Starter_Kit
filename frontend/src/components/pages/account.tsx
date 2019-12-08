import * as React from "react";
import AccountContent from "../content/myAccount/AccountContent";
import { RouteComponentProps } from "react-router";
import PageHead from "../shared/pageHead";
import { useMeQuery } from "../../generated/apolloComponents";
import { BigSpinner } from "../shared/BigSpinner";
import useSongContext from "../../context/useSongContext";

interface IAccountProps extends RouteComponentProps {}

const Account: React.FunctionComponent<IAccountProps> = props => {
  const { playlist } = useSongContext();
  const me = useMeQuery({
    fetchPolicy: "network-only"
  });

  if (me.loading || !me.data || !me.data.me) {
    return <BigSpinner />;
  } else {
    return (
      <div>
        <PageHead title="Account" />
        <br />
        <AccountContent {...props} me={me} userPlaylist={playlist} />
      </div>
    );
  }
};

export default Account;
