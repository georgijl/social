// import AccountSettings from "../settings/AccountSettings";
// import "@testing-library/jest-dom";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { Provider } from "react-redux";
// import { store } from "../../redux/store";
// import { BrowserRouter } from "react-router-dom";

// describe("<AccountSettings />", () => {
//   const setup = () => {
//     return {
//       user: userEvent.setup(),
//       ...render(
//         <Provider store={store}>
//           <AccountSettings />
//         </Provider>,
//         { wrapper: BrowserRouter }
//       ),
//     };
//   };

//   test("On logout to redirect to '/login", async () => {
//     const { user } = setup();

//     const button = screen.getByTestId("account");
//     await user.click(button);

//     const logOutBtn = screen.getByTestId("account__logout");
//     await user.click(logOutBtn);
//     expect(window.location.pathname).toBe("/login");
//   });

//   test("Click on account settings", async () => {
//     const { user } = setup();

//     const button = screen.getByTestId("account");
//     await user.click(button);

//     const accountDropdown = screen.getByTestId("account__dropdown");

//     expect(accountDropdown).toBeInTheDocument();
//   });
// });
