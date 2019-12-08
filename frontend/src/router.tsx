import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AudioPlayer } from "./components/content/AudioPlayer/AudioPlayer";
import WithAuthVerify from "./components/hooks/withAuthVerify";
import Index from "./components/pages";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { BigSpinner } from "./components/shared/BigSpinner";
import Layout from "./Layout";

import artists from "./components/pages/artists";
import ArtistSearch from "./components/pages/artist-search";

const Register = lazy(() => import("./components/pages/register"));
const Login = lazy(() => import("./components/pages/login"));
const Search = lazy(() => import("./components/pages/search"));
const Logout = lazy(() => import("./components/pages/logout"));
const FilesUploadPage = lazy(() =>
  import("./components/content/upload/fileUploadPage")
);
const Account = lazy(() => import("./components/pages/account"));
const Contacto = lazy(() => import("./components/pages/contact"));

const RouterComponent: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" component={Index} exact />
          <Route
            path="/login"
            render={props => (
              <Suspense {...props} fallback={<BigSpinner />}>
                <Login {...props} />
              </Suspense>
            )}
            exact
          />
          <Route
            path="/register"
            render={props => (
              <Suspense {...props} fallback={<BigSpinner />}>
                <Register {...props} />
              </Suspense>
            )}
            exact
          />
          <Route
            path="/filesupload"
            // component={FilesUploadPage}
            render={props => (
              <Suspense {...props} fallback={<BigSpinner />}>
                <FilesUploadPage />
              </Suspense>
            )}
            exact
          />
          <Route
            path="/logout"
            render={props => (
              <Suspense {...props} fallback={<BigSpinner />}>
                <Logout {...props} />
              </Suspense>
            )}
            exact
          />

          <Route
            path="/search/:query"
            render={props => (
              <Suspense {...props} fallback={<BigSpinner />}>
                <Search {...props} />
              </Suspense>
            )}
            exact
          />

          <Route
            path="/contact"
            exact
            render={props => (
              <Suspense {...props} fallback={<BigSpinner />}>
                <Contacto {...props} />
              </Suspense>
            )}
          />

          <Route path="/artists" exact component={artists} />
          <Route path="/artist-search/:query" exact component={ArtistSearch} />

          <Route
            path="/account"
            exact
            render={props => (
              <WithAuthVerify>
                <Suspense {...props} fallback={<BigSpinner />}>
                  <Account {...props} />
                </Suspense>
              </WithAuthVerify>
            )}
          />
          <Route path="/*" component={NotFoundPage} />
        </Switch>
        <AudioPlayer />
      </Layout>
    </BrowserRouter>
  );
};

export default RouterComponent;
