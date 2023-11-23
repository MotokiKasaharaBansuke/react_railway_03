import React from "react";
import { render, screen } from "@testing-library/react";
import { SignUpTest } from "./SignUp_test";

describe("Signup Component", () => {
  test("is contain email input", () => {
    render(<SignUpTest />);
    const emailInput = screen.getByLabelText(/メールアドレス/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  test("is contain password input", () => {
    render(<SignUpTest />);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("is contain username input", () => {
    render(<SignUpTest />);
    const usernameInput = screen.getByLabelText(/ユーザー名/i);
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute("type", "text");
  });
});
