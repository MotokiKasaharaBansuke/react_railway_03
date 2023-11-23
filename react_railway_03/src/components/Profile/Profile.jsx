import React, { useEffect, useState } from "react";
import { useToken } from "../../services/useTokenContext";
import { getUser, updateUser } from "../../services/userService";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../services/useFlashMessageContext";
import { useUser } from "../../services/useUserContext";

const schema = yup
  .object({
    name: yup.string().required("ユーザー名は必須です"),
  })
  .required();

export const Profile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const { token } = useToken();
  const [apiError, setApiError] = useState(null);
  const { setMessage } = useFlashMessage();
  const [initialName, setInitialName] = useState("");
  const { refreshUser } = useUser();

  useEffect(() => {
    getUser(token)
      .then((data) => {
        setValue("name", data.name);
        setInitialName(data.name);
      })
      .catch((error) => {
        setApiError(error.message);
      });
  }, [token, setValue]);

  const onSubmit = (data) => {
    updateUser(token, data)
      .then((data) => {
        setMessage(`ユーザー名を${data.name}に変更しました`);
        refreshUser();
        navigate(-1);
      })
      .catch((error) => {
        setApiError(error.message);
      });
  };

  const isNameChanged = watch("name") !== initialName;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {apiError && <p style={{ color: "red" }}>{apiError}</p>}
        <div>
          <label htmlFor="name">ユーザー名</label>
          <input id="name" type="text" {...register("name")} />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <button type="submit" disabled={!isNameChanged}>
          変更する
        </button>
      </form>
    </div>
  );
};
