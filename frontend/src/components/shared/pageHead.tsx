import React from "react";
import Helmet from "react-helmet";
import config from "../../config";

interface PageHeadProps {
  title: string;
}

const PageHead = ({ title }: PageHeadProps) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        {title && (
          <title>
            {" "}
            {title} | {config.siteShortName}
          </title>
        )}
        <link rel="canonical" href={config.FULL_SITE_URL} />
      </Helmet>
    </React.Fragment>
  );
};

export default PageHead;
