import { Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import cssClasses from "./Login.module.css";
import { useAuth } from "../AuthProvider";
import { USER } from "../../../helpers/auth";
import { routes } from "../../../helpers/routes";
import { Link } from "react-router-dom";
import { LOGIN } from "../../../helpers/login/login";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const { loginUserFlow } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().required(USER.EMAIL_REQUIRED),
    password: Yup.string().required(USER.PASSWORD_REQUIRED),
  });

  const onSubmit = async (values, { resetForm }) => {
    const email = values.email;
    const pwd = values.password;
    loginUserFlow(email, pwd);
    resetForm();
  };

  return (
    <div>
      <section className={cssClasses.section} data-testid="login">
        <h2>{LOGIN.SIGN_IN}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className={cssClasses.loginForm}>
            <div>
              <label htmlFor="email" className={cssClasses.basicLabel}>
                {LOGIN.EMAIL}
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                className={cssClasses.inputField}
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password" className={cssClasses.basicLabel}>
                {LOGIN.PASSWORD}
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className={cssClasses.inputField}
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <Button
              type="submit"
              variant="primary"
              className={cssClasses.submitButton}
              data-testid="login-signin_button"
            >
              Login
            </Button>
          </Form>
        </Formik>
        <p>
          {LOGIN.NEED_AN_ACCOUNT}
          <span className="line" data-testid="login-signup_span">
            <Link to={routes.UN_AUTHENTICATED.REGISTER.FULL_PATH}>
              {LOGIN.SIGNUP}
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
}

export default Login;
