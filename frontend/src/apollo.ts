import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
// import { WebSocketLink } from "apollo-link-ws";
import { split, ApolloLink } from "apollo-link";

import { getMainDefinition } from "apollo-utilities";
import { setContext } from "apollo-link-context";
import config from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { createUploadLink } from "apollo-upload-client";
// import { persistCache } from "apollo-cache-persist"; //NOT REQUIRED

//THIS IS THE WEBSOCKET LINK IN CASE I NEED SUBSCRIPTIONS OR REALTIME CHAT
// const wsLink = new WebSocketLink({
//   uri: config.APOLLO_SUBSCRIPTIONS_URI,
//   options: {
//     reconnect: true
//   }
// });

const cache = new InMemoryCache({});

//Should await this before creating the apolloclient but unable to without an async function
// persistCache({
//   cache,
//   storage: window.localStorage as any
// });

const link = new HttpLink({
  uri: config.APOLLO_HTTP_URI,
  credentials: "include",
  headers: {
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site"
  }
});

const uploadLink = createUploadLink({
  uri: config.APOLLO_HTTP_URI,
  credentials: "include",
  headers: {
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site"
  }
});

const middlewareLink = setContext(() => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      ACCESS_TOKEN
    )} ${localStorage.getItem(REFRESH_TOKEN)}`
  }
}));

const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();
  if (headers) {
    const token = headers.get(ACCESS_TOKEN);
    const refreshToken = headers.get(REFRESH_TOKEN);

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
    }

    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    }
  }

  return forward(operation);
});

const combinedLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  // wsLink, //WEB SOCKET LINK FOR CHAT AND SUBSCRIPTIONS
  link,
  uploadLink
);

const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(combinedLink)
);

const client = new ApolloClient({
  cache,
  link: httpLinkWithMiddleware
});

export default client;
