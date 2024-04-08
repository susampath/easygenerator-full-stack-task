import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Login from "./Login";

import { AuthContext } from "../AuthProvider";

import { getByTestId } from "../../../utils/TestUtils";

const mockLoginUserFlow = jest.fn();

const defaultContextValues = {
  isProcessing: false,
  setAuth: jest.fn(),
  setIsBackendAuthorized: jest.fn(),
  loginUserFlow: mockLoginUserFlow,
};

const setup = () =>
  render(
    <BrowserRouter>
      <AuthContext.Provider value={defaultContextValues}>
        <Login />
      </AuthContext.Provider>
    </BrowserRouter>
  );

describe("Login component tests", () => {
  test("Renders the Login component", () => {
    const view = setup();
    // eslint-disable-next-line
    const component = getByTestId(view.container, "login");
    expect(component).toBeInTheDocument();
  });
  test("Allows user to enter username and password", async () => {
    setup();
    const usernameInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    // eslint-disable-next-line
    act(() => {
      fireEvent.change(usernameInput, { target: { value: "testuser" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
    });
    await waitFor(
      () => expect(usernameInput).toHaveValue("testuser"),
      expect(passwordInput).toHaveValue("password123")
    );
  });

  test('Navigates to the registration page when "Sign Up" link is clicked', () => {
    setup();
    const signUpLink = screen.getByTestId("login-signup_span");
    fireEvent.click(signUpLink);
  });

  test("Calls loginUserFlow with correct values on form submission", async () => {
    setup();
    // Simulate form submission
    const usernameInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    // eslint-disable-next-line
    await act(async () => {
      fireEvent.click(screen.getByTestId("login-signin_button"));
    });

    // Check if registerUserFlow is called with the correct values
    expect(mockLoginUserFlow).toHaveBeenCalledWith("testuser", "password123");
  });
});
