import { Button, Container, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import * as yup from "yup";
import { useLoginMutation, MeQuery } from "../../../generated/apolloComponents";
import { meQuery } from "../../../graphql/user/query/meQuery";

import { TextInputFieldGenerator } from "../../hooks/TextInputFieldGenerator";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
import { ThemeContext } from "../../../context/themeContext";

const schema = yup.object({
  email: yup
    .string()
    .email()
    .required("Email is required.")
    .min(2, "First Name should have at least 2 characters."),
  password: yup
    .string()
    .required("Password is required.")
    .min(5, "The Password should have at least 5 characters.")
});

interface ILoginFormProps extends RouteComponentProps {}

const LoginForm: React.FC<ILoginFormProps> = props => {
  const [loginMutation, response] = useLoginMutation();
  const { changeTheme: setTheme } = useContext(ThemeContext);
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={schema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={async ({ email, password }, { setErrors }) => {
            loginMutation({
              update: async (cache, { errors, ...updateRes }) => {
                if (errors) {
                  console.log("ERRORS", errors);
                  setErrors({
                    email:
                      "Server Error. Unable To Login. Plaese verify and try again."
                  });
                  return;
                }
                if (!updateRes || updateRes === null) {
                  setErrors({
                    email:
                      "!updateRes || updateRes === null, 105 Unable To Login. Plaese verify and try again."
                  });
                  return;
                }

                if (updateRes.data && updateRes.data.login === null) {
                  setErrors({
                    password: "Unable To Login. Plaese verify and try again."
                  });
                }

                if (updateRes && updateRes.data && updateRes.data.login) {
                  if (cache.writeQuery) {
                    cache.writeQuery<MeQuery>({
                      query: meQuery,
                      data: {
                        me: {
                          __typename: "User",
                          avatar: updateRes.data.login.avatar,
                          email: updateRes.data.login.email,
                          id: updateRes.data.login.id,
                          name: updateRes.data.login.name,
                          firstName: updateRes.data.login.firstName,
                          lastName: updateRes.data.login.lastName,
                          accessToken: updateRes.data.login.accessToken,
                          admin: updateRes.data.login.admin,
                          refreshToken: updateRes.data.login.refreshToken,
                          themeMode: updateRes.data.login.themeMode
                        },
                        __typename: "Query"
                      }
                    });
                    //JWT AUTH METHOD
                    updateRes.data.login.accessToken &&
                      localStorage.setItem(
                        ACCESS_TOKEN,
                        updateRes.data.login.accessToken
                      );
                    updateRes.data.login.refreshToken &&
                      localStorage.setItem(
                        REFRESH_TOKEN,
                        updateRes.data.login.refreshToken
                      );
                    //END JWT AUTH METHOD

                    //TODO: Validate that is a valid Theme Mode "light or dark"
                    updateRes.data.login.themeMode &&
                      setTheme(updateRes.data.login.themeMode as any);
                    // localStorage.setItem(
                    //   "vm-teamMode",
                    //   updateRes.data.login.themeMode
                    // );

                    props.history.push("/account");
                  }
                }
              },
              variables: {
                email: email,
                password: password
              }
            });

            return;
          }}
        >
          {() => (
            <Container maxWidth="sm">
              <Form>
                <TextInputFieldGenerator
                  name="email"
                  placeholder="Email"
                  type="email"
                />

                <TextInputFieldGenerator
                  name="password"
                  placeholder="Password"
                  type="password"
                />

                <br />
                <Grid container justify="space-around">
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={response.loading}
                    >
                      Login
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined">
                      <Link
                        to="/register"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Register
                      </Link>
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Container>
          )}
        </Formik>
      </Container>
    </React.Fragment>
  );
};

export default LoginForm;
