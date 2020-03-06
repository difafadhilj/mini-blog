import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();

  const handleLogin = async data => {
    try {
      const result = await axios.post("http://localhost:8080/login", {
        username: data.username,
        password: data.password
      });

      window.sessionStorage.setItem("token", result.data.accessToken);
      window.sessionStorage.setItem("id", result.data.user.id);
      window.sessionStorage.setItem("admin", result.data.user.admin);

      if (result.status === 200) {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      alert("Login gagal");
    }
  };

  if (window.sessionStorage.getItem("token")) return <h1>Sudah Login</h1>;
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <label for="username">Username :</label>
          <input
            id="username"
            className="form-control"
            type="text"
            name="username"
            ref={register({
              required: "This fields is required",
              minLength: {
                value: 3,
                message: "This field is required 3 characters minimum length"
              }
            })}
          />
          <span className="text-danger">
            {errors.username && errors.username.message}
          </span>
        </div>

        <div>
          <label for="password">Password :</label>
          <input
            id="password"
            className="form-control"
            type="password"
            name="password"
            ref={register({
              required: {
                value: true,
                message: "This field is required"
              },
              minLength: {
                value: 3,
                message: "This field required at least 3 characters length"
              }
            })}
          />
          <span className="text-danger">
            {errors.password && errors.password.message}
          </span>
        </div>

        <input
          type="submit"
          onClick={handleSubmit(handleLogin)}
          className="btn btn-primary mt-3"
        />
      </form>
    </div>
  );
}

export default Login;
