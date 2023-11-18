import React, { useState } from "react";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleBlur = (e) => {
    if (e.target.name === "email") {
      if (!validateEmail(e.target.value)) {
        setErrors({ ...errors, email: "無効なメールアドレスです。" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.email) {
      // seinup
    }
  };
  return (
    <>
      <div>
        <h2>アカウント新規作成</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">ユーザー名</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {errors.email && (
              <p className="emailError" style={{ color: "red" }}>
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </div>
          <button type="submit">アカウント作成</button>
        </form>
      </div>
    </>
  );
};
