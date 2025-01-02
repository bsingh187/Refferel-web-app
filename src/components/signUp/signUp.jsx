import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.scss";
import { signUp } from "../../Service/signUp.Service";

const SignUpPage = () => {
  const { refCode } = useParams();
  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    instagramId: "",
    password: "",
    confirmPassword: "",
    refByCode: refCode || "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Phone is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    instagramId: Yup.string().required("Instagram ID is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    // refByCode: Yup.string().required("Referral Code is required"),
  });

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (
    values,
    { setSubmitting, resetForm, setFieldError }
  ) => {
    try {
      const { confirmPassword, ...payload } = values;
      payload.phone = String(payload.phone);

      const response = await signUp(payload);

      if (response?.statusCode === 201) {
        localStorage.setItem("email", payload.email);

        navigate("/verify-otp");
      } else {
        setFieldError(
          "general",
          response?.message || "An error occurred. Please try again."
        );
      }

      resetForm();
    } catch (error) {
      setFieldError("general", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const referralCode = params.get("referralCode");
    if (referralCode) {
      initialValues.refByCode = referralCode;
    }
  }, [location]);

  return (
    <div className="main-container">
      <div className="sign-up-container">
        <h2>Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name<span className="required">*</span>
                  </label>
                  <Field type="text" id="firstName" name="firstName" />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Field type="text" id="lastName" name="lastName" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    Phone<span className="required">*</span>
                  </label>
                  <Field type="text" id="phone" name="phone" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Email<span className="required">*</span>
                  </label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="instagramId">
                    Instagram ID<span className="required">*</span>
                  </label>
                  <Field type="text" id="instagramId" name="instagramId" />
                  <ErrorMessage
                    name="instagramId"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    Password<span className="required">*</span>
                  </label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    Confirm Password<span className="required">*</span>
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="refByCode">
                    Referral Code<span className="required">*</span>
                  </label>
                  <Field type="text" id="refByCode" name="refByCode" />
                </div> */}
                <div className="form-group">
                  <label htmlFor="refByCode">Referral Code</label>
                  <Field type="text" id="refByCode" name="refByCode" />
                </div>
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
        <a href="/" className="login-link">
          Already have an account? Log in
        </a>
      </div>
    </div>
  );
};

export default SignUpPage;
