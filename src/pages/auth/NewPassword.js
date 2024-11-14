import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import UserApi from '../../api/UserApi';

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Label
} from "reactstrap";
import { Formik, FastField, Form, ErrorMessage } from 'formik';
import CustomErrorMessage from "../../components/formik/CustomErrorMessage";
import * as Yup from 'yup';
import { ReactstrapInput } from "reactstrap-formik";

import { showSuccessNotification } from "../../utils/Notification";

const NewPassword = (props) => {

  const { token } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [isValidToken, setValidToken] = useState();

  useEffect(() => {
    const checkTokenValid = async () => {
      setLoading(true);
      const isValid = await UserApi.isValidResetPasswordToken(token);
      setValidToken(isValid);
      setLoading(false);
    }

    checkTokenValid();
  }, [token]);

  if (isLoading) {
    return null;
  }

  if (!isValidToken) {
    return <Redirect to='/auth/reset-password/invalid-token' />;
  }

  return (
    <>
      <div className="text-center mt-4">
        <h1 className="h2">Reset password</h1>
        <p className="lead">Enter your new password.</p>
      </div>

      <Formik
        initialValues={
          {
            password: '',
            confirmpassword: '',
            token: token
          }
        }
        validationSchema={
          Yup.object({
            password: Yup.string()
              .max(50, 'Must be between 6 to 50 characters')
              .min(6, 'Must be between 6 to 50 characters')
              .required('Required'),

            confirmpassword: Yup.string()
              .when("password", {
                is: value => (value && value.length > 0 ? true : false),
                then: Yup.string().oneOf(
                  [Yup.ref("password")],
                  "Both password need to be the same"
                )
              })
              .required('Required'),

            token: Yup.string()
              .test('checkValidToken', 'Invalid Token, please reload screen.', async token => {
                // call api
                const isValid = await UserApi.isValidResetPasswordToken(token);
                return isValid;
              }),
          })
        }
        onSubmit={
          async (values) => {
            try {
              // call api
              await UserApi.resetPassword(token, values.password);

              // notification
              showSuccessNotification(
                "Reset Password",
                "Reset Password Successfully!"
              );

              // redirect login page
              props.history.push("/auth/sign-in");

            } catch (error) {
              console.log(error);
            }
          }
        }
        validateOnChange={false}
      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody>
              <div className="m-sm-4">
                <Form>

                  {/* password */}
                  <FormGroup>
                    <Label>
                      Password
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <FastField
                      bsSize="lg"
                      type="password"
                      name="password"
                      placeholder="Enter new password"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  {/* confirm password */}
                  <FormGroup>
                    <Label>
                      Confirm Password
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <FastField
                      bsSize="lg"
                      type="password"
                      name="confirmpassword"
                      placeholder="Enter confirm new password"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <ErrorMessage name="token" component={CustomErrorMessage} />

                  <div className="text-center mt-3">
                    <Button type="submit" color="primary" size="lg" disabled={isSubmitting}>
                      Reset password
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>
    </>
  )
};

export default NewPassword;
