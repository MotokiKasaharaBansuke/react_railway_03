import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { SignUp } from "../components/SignUp/SignUp";
import { SignIn } from "../components/SignIn/SignIn";
import { BookList } from "../components/BookList/BookList";
import { Header } from "../components/Header/Header";
import { Profile } from "../components/Profile/Profile";
import { FlashMessage } from "../components/FlashMessage/FlashMessage";
import { PrivateRoute } from "./PrivateRoute";
import { useToken } from "../services/useTokenContext";

export const Router = () => {
  const { token } = useToken();
  return (
    <BrowserRouter>
      {token && <Header />}
      <FlashMessage />
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/" element={<BookList />} />
        <Route
          exact
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
