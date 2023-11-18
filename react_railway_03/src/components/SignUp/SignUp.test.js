import React from "react";
import { render, screen } from "@testing-library/react";
import { SignUp } from "./SignUp";

describe("Signup Component", () => {
  test("is contain email input", () => {
    render(<SignUp />);
    const emailInput = screen.getByLabelText(/メールアドレス/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  test("is contain password input", () => {
    render(<SignUp />);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("is contain username input", () => {
    render(<SignUp />);
    const usernameInput = screen.getByLabelText(/ユーザー名/i);
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute("type", "text");
  });
});
