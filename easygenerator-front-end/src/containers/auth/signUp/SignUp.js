import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useAuth } from "../AuthProvider";
import { USER } from "../../../helpers/auth";
import { routes } from "../../../helpers/routes";
import { SIGNUP } from "../../../helpers/signup/signUp";

import cssClasses from "./SignUp.module.css";
function SingUp() {
  const initialValues = {
    email: "",
    name: "",
    password: "",
  };
  const { registerUserFlow } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().required(USER.EMAIL_REQUIRED),
    name: Yup.string().required(USER.NAME_REQUIRED),
    password: Yup.string()
      .required(USER.PASSWORD_REQUIRED)
      .min(8, USER.PASSWORD_VALIDATION_LENGTH)
      .matches(/[a-zA-Z]/, USER.PASSWORD_VALIDATION_LETTER)
      .matches(/[0-9]/, USER.PASSWORD_VALIDATION_NUMBER)
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        USER.PASSWORD_VALIDATION_SPECIAL_CHARACTER
      ),
  });

  const onSubmit = async (values, { resetForm }) => {
    const email = values.email;
    const name = values.name;
    const password = values.password;
    registerUserFlow(email, name, password);
    resetForm();
  };

  return (
    <div>
      <section className={cssClasses.section}>
        <h2>{SIGNUP.SIGNUP}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className={cssClasses.loginForm}>
            <div>
              <label htmlFor="text" className={cssClasses.basicLabel}>
                {SIGNUP.NAME}
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                className={cssClasses.inputField}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={cssClasses.inputError}
              />
            </div>
            <div>
              <label htmlFor="email" className={cssClasses.basicLabel}>
                {SIGNUP.EMAIL}
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                className={cssClasses.inputField}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={cssClasses.inputError}
              />
            </div>

            <div>
              <label htmlFor="password" className={cssClasses.basicLabel}>
                {SIGNUP.PASSWORD}
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className={cssClasses.inputField}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={cssClasses.inputError}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className={cssClasses.submitButton}
            >
              SignUp
            </Button>
          </Form>
        </Formik>
        <p>
          {SIGNUP.ALREADY_REGISTERED}
          <span className="line">
            <Link to={routes.UN_AUTHENTICATED.LOGIN.FULL_PATH}>
              {SIGNUP.SIGN_IN}
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
}

export default SingUp;
