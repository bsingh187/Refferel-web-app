import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { logIn } from "../../Service/login.Service"; 
import * as Yup from "yup";
import "./style.scss";

const LoginPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    phone: "", // Updated field name
    password: "",
  };

  const validationSchema = Yup.object({
    phone: Yup.string().required("Username or Phone is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await logIn(values);

      if (!response.error) {
        navigate("/home");
      }
    } catch (error) {
      setFieldError("general", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="phone">
                Username or Phone<span className="required">*</span>
              </label>
              <Field type="text" id="phone" name="phone" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password<span className="required">*</span>
              </label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Logging In..." : "Login"}
            </button>
            {/* <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </p> */}
          </Form>
        )}
      </Formik>
      <div className="sign-up-message">
        <span>Don’t have an account?</span>{" "}
        <span className="sign-up" onClick={handleSignUp}>
          Sign Up
        </span>
      </div>
    </div>
  </div>
  
  );
};

export default LoginPage;
