import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import "./login.scss";
import { FormigLoginInterface, UserState } from "../interfaces/interfaces";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, userId } from "../../redux/userReducer";
import { getUser } from "../../utils/getUser";

interface MockData {
  emailErrorMsg?: string;
  passwordErrorMsg?: string;
  mockError?: string;
}

const Login: FC<MockData> = ({
  emailErrorMsg,
  passwordErrorMsg,
  mockError,
}) => {
  const loginError = useSelector((state: UserState) => state.userInfo.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email("Please enter a valid email").required(),
    password: yup.string().required("password is required"),
  });

  // Call data
  const onSubmit = async (values: FormigLoginInterface) => {
    const { ...data } = values;

    const response = await axios.post("/user/login", data).catch((error) => {
      if (error && error.response) dispatch(login(error.response.data.message));
    });

    if (response && response.data) {
      dispatch(userId(getUser(response.data.token)));
      navigate("/");
    }
  };

  // Handle data from formik form
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__wrapper-left">
          <h3 className="login-logo">Social</h3>
          <span className="login-descr">
            Connect with friends and the world around you on Social.
          </span>
        </div>
        <div className="login__wrapper-right">
          <form
            className="login-box"
            onSubmit={formik.handleSubmit}
            data-testid="login-form"
          >
            <input
              placeholder="Email"
              className="login-input"
              type="email"
              name="email"
              data-testid="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="login__error" data-testid="login__error">
                {" "}
                {formik.errors.email}{" "}
              </div>
            )}
            {emailErrorMsg && (
              <div className="login__error" data-testid="login__error">
                {emailErrorMsg}
              </div>
            )}
            <input
              placeholder="Password"
              className="login-input"
              type="password"
              name="password"
              data-testid="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="login__error" data-testid="login__error">
                {" "}
                {formik.errors.password}{" "}
              </div>
            )}
            {passwordErrorMsg && (
              <div className="login__error" data-testid="login__error">
                {passwordErrorMsg}
              </div>
            )}
            <button
              className="login-btn"
              type="submit"
              data-testid="submit-btn"
            >
              Sign In
            </button>
            <Link to="/register" className="create-btn">
              Register
            </Link>
            {mockError && (
              <p className="login__error" data-testid="login-error">
                {mockError}
              </p>
            )}
            {loginError && <p className="login__error">{loginError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
