import * as React from "react";
import { Link } from "react-router-dom";
import { Link as MaterialLink } from "@material-ui/core";

interface ICustomRouterLinkProps {
  href: string;
}

const MyLink = (props: any[any]) => {
  const { navigate, ...rest } = props;
  return <MaterialLink {...rest} color="secondary" />;
};

const CustomRouterLink: React.FunctionComponent<ICustomRouterLinkProps> = ({
  href,
  ...props
}) => {
  return (
    <Link component={MyLink} to={href}>
      {props.children}
    </Link>
  );
};

export default CustomRouterLink;
