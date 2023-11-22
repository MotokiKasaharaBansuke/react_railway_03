import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { SignUp } from "../components/SignUp/SignUp";
import { SignIn } from "../components/SignIn/SignIn";
import { BookList } from "../components/BookList/BookList";
import { Header } from "../components/Header/Header";

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
};
