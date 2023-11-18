import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { SignUp } from "../components/SignUp/SignUp";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
