import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  FormikInterface,
  PostReducer,
  UserState,
} from "../interfaces/interfaces";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { validationSchema } from "./ValidationSchema";
import { userId } from "../../redux/userReducer";
import { getUser } from "../../utils/getUser";
import { login } from "../../redux/postReducer";

interface MockData {
  existingError?: string;
}

const Register: FC<MockData> = ({ existingError }) => {
  const loginError = useSelector((state: PostReducer) => state.post.login);
  const userInfo = useSelector((state: UserState) => state.userInfo.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: FormikInterface) => {
    const { ...data } = values;

    const response = await axios.post("/user/register", data).catch((error) => {
      if (error && error.response) dispatch(login(error.response.data.message));
    });

    if (response && response.data) {
      dispatch(userId(getUser(response.data.token)));
    }
  };

  // Handle data from formik form
  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

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
            data-testid="register"
          >
            <input
              autoComplete="false"
              placeholder="Username"
              className="login-input"
              type="text"
              name="userName"
              data-testid="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.userName && formik.errors.userName && (
              <div className="login__error" data-testid="login__error-username">
                {" "}
                {formik.errors.userName}{" "}
              </div>
            )}
            <input
              autoComplete="false"
              placeholder="First name"
              className="login-input"
              type="text"
              name="firstName"
              data-testid="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div
                className="login__error"
                data-testid="login__error-firstname"
              >
                {" "}
                {formik.errors.firstName}{" "}
              </div>
            )}
            <input
              autoComplete="false"
              placeholder="Last name"
              className="login-input"
              type="text"
              name="lastName"
              data-testid="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="login__error" data-testid="login__error-lastname">
                {" "}
                {formik.errors.lastName}{" "}
              </div>
            )}
            <input
              autoComplete="false"
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
              <div className="login__error" data-testid="login__error-email">
                {" "}
                {formik.errors.email}{" "}
              </div>
            )}
            <input
              autoComplete="false"
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
              <div className="login__error" data-testid="login__error-password">
                {" "}
                {formik.errors.password}{" "}
              </div>
            )}
            <Link to="/login" className="login-btn">
              Sign In
            </Link>
            <button
              className="create-btn"
              type="submit"
              data-testid="submit-btn"
            >
              Register
            </button>
            {existingError && (
              <div className="login__error" data-testid="login__error">
                {existingError}
              </div>
            )}
            {loginError && (
              <p className="login__error" data-testid="login__error-validation">
                {loginError}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
