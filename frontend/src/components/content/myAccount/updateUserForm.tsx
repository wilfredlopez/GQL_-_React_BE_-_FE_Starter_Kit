import { Button, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { useUpdateUserMutation } from "../../../generated/apolloComponents";

import { TextInputFieldGenerator } from "../../hooks/TextInputFieldGenerator";
import client from "../../../apollo";

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
    .min(2, "First Name should have at least 2 characters.")
});

interface IUpdateUserFormProps {
  email: string;
  firstName: string;
  lastName: string;
}

const UpdateUserForm: React.FC<IUpdateUserFormProps> = props => {
  const [updateUserMutation, response] = useUpdateUserMutation();

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: props.email,
          firstName: props.firstName,
          lastName: props.lastName
        }}
        validationSchema={schema}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={async ({ email, firstName, lastName }, { setErrors }) => {
          updateUserMutation({
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

              if (updateRes.data && updateRes.data.updateUser === false) {
                setErrors({
                  email: "Unable To Login. Plaese verify and try again."
                });
              }

              if (updateRes && updateRes.data && updateRes.data.updateUser) {
                client.reFetchObservableQueries();
                console.log(updateRes.data.updateUser);
              }
            },
            variables: {
              email: email,
              firstName,
              lastName
            }
          });

          return;
        }}
      >
        {() => (
          <Form>
            <TextInputFieldGenerator
              name="firstName"
              placeholder="First Name"
            />
            <TextInputFieldGenerator name="lastName" placeholder="Last Name" />
            <TextInputFieldGenerator
              name="email"
              placeholder="Email"
              type="email"
            />

            <br />
            <Grid container justify="space-around">
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={response.loading}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default UpdateUserForm;
