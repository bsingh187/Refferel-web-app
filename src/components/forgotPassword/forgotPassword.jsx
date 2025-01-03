
// ForgotPasswordPage.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.scss";

const ForgotPasswordPage = () => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const onSubmit = (values) => {
    alert("Password reset link sent to your email.");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Forgot Password</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {() => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email<span className="required">*</span></label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
