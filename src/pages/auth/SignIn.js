import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import storage from "../../storage/Storage";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  CustomInput,
  Label
} from "reactstrap";

import { showErrorNotification } from "../../utils/Notification";

import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';

import UserApi from "../../api/UserApi";

import avatar from "../../assets/img/avatars/avatar.jpg";

import { setUserLoginInfo } from "../../redux/actions/LoginActions";


const SignIn = (props) => {

  // rememberMe
  const [checkedRememberMe, setCheckedRememberMe] = useState(storage.isRememberMe());

  return (
    <React.Fragment>
      <div className="text-center mt-4">
        <h2>Welcome to VTI Academy</h2>
        <p className="lead">Sign in to your account to continue</p>
      </div>

      <Formik
        initialValues={
          {
            username: '',
            password: ''
          }
        }
        validationSchema={
          Yup.object({
            username: Yup.string()
              .min(6, 'Must be between 6 and 50 characters')
              .max(50, 'Must be between 6 and 50 characters')
              .required('Required'),

            password: Yup.string()
              .min(6, 'Must be between 6 and 50 characters')
              .max(50, 'Must be between 6 and 50 characters')
              .required('Required')
          })
        }

        onSubmit={
          async (values) => {
            try {
              // call api
              const response = await UserApi.login(
                values.username,
                values.password
              );

              // set remember me
              storage.setRememberMe(checkedRememberMe);

              // save token & UserInfo to storage
              storage.setToken(response.token, response.refreshToken);
              storage.setUserInfo(
                response.firstName,
                response.lastName,
                response.fullName,
                response.gender,
                response.username,
                response.email,
                response.role);

              // save token & UserInfo to redux
              props.setUserLoginInfo(
                response.firstName,
                response.lastName,
                response.fullName,
                response.gender,
                response.username,
                response.email,
                response.role);

              // redirect to home page
              props.history.push("/dashboard");

            } catch (error) {
              if (error.status === 401) {
                // show error notification
                showErrorNotification("Login Fail!", "Wrong Username or Password!")
              } else {
                console.log(error);
              }
            }
          }
        }
      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody>
              <div className="m-sm-4">
                <div className="text-center">
                  <img
                    src={avatar}
                    alt="User"
                    className="img-fluid rounded-circle"
                    width="132"
                    height="132"
                  />
                  <br />
                </div>
                <Form>

                  <FormGroup>
                    <Label>Username</Label>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="username"
                      placeholder="Enter your username"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Password</Label>
                    <FastField
                      type="password"
                      bsSize="lg"
                      name="password"
                      placeholder="Enter password"
                      component={ReactstrapInput}
                    />
                    <small>
                      <Link to="/auth/reset-password">Forgot password?</Link>
                    </small>
                  </FormGroup>

                  {/* Remember me */}
                  <div>
                    <CustomInput
                      type="checkbox"
                      id="rememberMe"
                      label="Remember me next time"
                      defaultChecked={checkedRememberMe}
                      onChange={() => setCheckedRememberMe(!checkedRememberMe)}
                    />
                  </div>

                  {/* submit */}
                  <div className="text-center mt-3">
                    <Button type='submit' color="primary" size="lg" disabled={isSubmitting}>
                      Sign in
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>
    </React.Fragment>
  )
};

export default withRouter(connect(null, { setUserLoginInfo })(SignIn));