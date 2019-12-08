import { Button, Container, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import * as yup from "yup";
import {
  useRegisterMutation,
  MeQuery,
  LoginMutation,
  LoginMutationVariables
} from "../../../generated/apolloComponents";
import { meQuery } from "../../../graphql/user/query/meQuery";

import { TextInputFieldGenerator } from "../../hooks/TextInputFieldGenerator";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
import { ThemeContext } from "../../../context/themeContext";
import { loginMutation } from "../../../graphql/user/mutation/loginMutation";
// import { loginMutation } from "../../../graphql/user/mutation/loginMutation";

const schema = yup.object({
  firstName: yup
    .string()
    .required("Email is required.")
    .min(2, "First Name should have at least 2 characters."),
  lastName: yup
    .string()
    .required("Email is required.")
    .min(2, "First Name should have at least 2 characters."),
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

interface IRegisterFormProps extends RouteComponentProps {}

const RegisterForm: React.FC<IRegisterFormProps> = props => {
  const [registerMutation, response] = useRegisterMutation();
  const { changeTheme: setTheme } = useContext(ThemeContext);
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: ""
          }}
          validationSchema={schema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={async (
            { email, password, firstName, lastName },
            { setErrors }
          ) => {
            try {
              await registerMutation({
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

                  if (updateRes.data && updateRes.data.register === null) {
                    setErrors({
                      password: "Unable To Login. Plaese verify and try again."
                    });
                  }

                  if (updateRes && updateRes.data && updateRes.data.register) {
                    cache.writeQuery<LoginMutation, LoginMutationVariables>({
                      query: loginMutation,
                      variables: {
                        email,
                        password
                      },
                      data: {
                        __typename: "Mutation",
                        login: {
                          __typename: "User",
                          avatar: updateRes.data.register.avatar,
                          email: updateRes.data.register.email,
                          id: updateRes.data.register.id,
                          name: updateRes.data.register.name,
                          firstName: updateRes.data.register.firstName,
                          lastName: updateRes.data.register.lastName,
                          accessToken: updateRes.data.register.accessToken,
                          admin: updateRes.data.register.admin,
                          refreshToken: updateRes.data.register.refreshToken,
                          themeMode: updateRes.data.register.themeMode
                        }
                      }
                    });
                    if (cache.writeQuery) {
                      cache.writeQuery<MeQuery>({
                        query: meQuery,
                        data: {
                          me: {
                            __typename: "User",
                            avatar: updateRes.data.register.avatar,
                            email: updateRes.data.register.email,
                            id: updateRes.data.register.id,
                            name: updateRes.data.register.name,
                            firstName: updateRes.data.register.firstName,
                            lastName: updateRes.data.register.lastName,
                            accessToken: updateRes.data.register.accessToken,
                            admin: updateRes.data.register.admin,
                            refreshToken: updateRes.data.register.refreshToken,
                            themeMode: updateRes.data.register.themeMode
                          },
                          __typename: "Query"
                        }
                      });

                      //JWT AUTH METHOD
                      updateRes.data.register.accessToken &&
                        localStorage.setItem(
                          ACCESS_TOKEN,
                          updateRes.data.register.accessToken
                        );
                      updateRes.data.register.refreshToken &&
                        localStorage.setItem(
                          REFRESH_TOKEN,
                          updateRes.data.register.refreshToken
                        );
                      //END JWT AUTH METHOD

                      //TODO: Validate that is a valid Theme Mode "light or dark"
                      updateRes.data.register.themeMode &&
                        setTheme(updateRes.data.register.themeMode as any);
                      // updateRes.data.register.themeMode &&
                      //   localStorage.setItem(
                      //     "vm-teamMode",
                      //     updateRes.data.register.themeMode
                      //   );

                      props.history.push("/account");
                    }
                  }
                },
                variables: {
                  email: email,
                  password: password,
                  firstName,
                  lastName
                }
              });

              return;
            } catch (error) {
              console.log(error, "catched Error");

              if (
                error.graphQLErrors[0].extensions.exception.validationErrors[0]
                  .constraints.isEmailAlreadyExistConstraint
              ) {
                setErrors({
                  email: "Email already exist"
                });
                return;
              }

              // console.log(
              //   JSON.stringify(
              //     error.graphQLErrors[0].extensions.exception
              //       .validationErrors[0].constraints
              //       .isEmailAlreadyExistConstraint,
              //     null,
              //     2
              //   )
              // );
              setErrors({
                email: "Server Error. Please verify the arguments"
              });
            }
          }}
        >
          {() => (
            <Container maxWidth="sm">
              <Form>
                <TextInputFieldGenerator
                  name="firstName"
                  placeholder="First Name"
                />
                <TextInputFieldGenerator
                  name="lastName"
                  placeholder="Last Name"
                />
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
                      Register
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined">
                      <Link
                        to="/login"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Back To Login
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

export default RegisterForm;
