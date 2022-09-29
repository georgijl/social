import Login from "../login/Login";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const mockSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: () => mockSelector(),
  useDispatch: () => mockDispatch(),
}));

const mockLogin = jest.fn();
const mockUserId = jest.fn();

jest.mock("../../redux/userReducer", () => ({
  login: () => mockLogin,
  userId: () => mockUserId,
}));

const data = "Invalid email or password";

describe("<Login />", () => {
  const emailErrorMsg = "email is a required field";
  const passwordErrorMsg = "password is required";
  const errorMsg = "Invalid email or password";

  const setup = () => {
    mockSelector.mockReturnValue(data);
    return {
      user: userEvent.setup(),
      ...render(
        <Login
          emailErrorMsg={emailErrorMsg}
          passwordErrorMsg={passwordErrorMsg}
          mockError={errorMsg}
        />,
        { wrapper: BrowserRouter }
      ),
    };
  };

  test("Renders correctly initial document", async () => {
    setup();
    const loginButton = screen.getByTestId("submit-btn");
    expect(loginButton).toBeInTheDocument();
  });

  test("Login write wrong email", async () => {
    const { user } = setup();

    const email = screen.getByTestId("email");
    const loginButton = screen.getByTestId("submit-btn");

    await user.type(email, "a");
    await user.click(loginButton);
    const userErr = screen.getByText("email is a required field");
    expect(userErr).toHaveTextContent("email is a required field");
  });

  test("Login write wrong password", async () => {
    const { user } = setup();

    const email = screen.getByTestId("password");
    const loginButton = screen.getByTestId("submit-btn");

    await user.type(email, "a");
    await user.click(loginButton);
    const userErr = screen.getByText("password is required");
    expect(userErr).toHaveTextContent("password is required");
  });

  test("Login form with wrong credentials", async () => {
    const { user } = setup();

    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    const loginButton = screen.getByTestId("submit-btn");

    await user.type(email, "georgijl@abv.bg");
    await user.type(password, "georgijl@abv.bg");
    await user.click(loginButton);

    const userErr = screen.queryByTestId("login-error");

    expect(mockSelector.mock.results[0].value).toEqual(userErr?.textContent);
  });
});
