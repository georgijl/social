import Register from "../register/Register";
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

const dataExist = "This email georgijl@abv.bg is already taken";

const credentials = {
  username: "georgijl",
  name: "Georgi",
  lastName: "Ivanov",
  email: "georgijl@abv.bg",
  password: "123456789Mm",
};

describe("<Register />", () => {
  const setup = () => {
    mockSelector.mockReturnValue(dataExist);
    return {
      user: userEvent.setup(),
      ...render(<Register existingError={dataExist} />, {
        wrapper: BrowserRouter,
      }),
    };
  };

  test("Already existing account", async () => {
    const { user } = setup();

    const username = screen.getByTestId("userName");
    const name = screen.getByTestId("firstName");
    const lname = screen.getByTestId("lastName");
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");

    await user.type(username, credentials.username);
    await user.type(name, credentials.name);
    await user.type(lname, credentials.lastName);
    await user.type(email, credentials.email);
    await user.type(password, credentials.password);

    const registerButton = screen.getByTestId("submit-btn");
    await user.click(registerButton);
    const userErr = screen.getByTestId("login__error");

    expect(`${mockSelector.mock.results[0].value}`).toEqual(
      userErr.textContent
    );
  });
});
