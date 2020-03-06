import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

function Register() {
  const history = useHistory();
  const { register, handleSubmit, errors, getValues } = useForm();

  const handleRegister = async data => {
    try {
      const result = await axios.post("http://localhost:8080/register", {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        roles: ["USER"]
      });

      if (result.status === 201) {
        alert("Register successfully!");
        history.push("/login");
      } else {
        throw new Error("Register failed!");
      }
    } catch (err) {
      alert("Register Failed");
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <label htmlFor="name">Name :</label>
          <input
            id="name"
            className="form-control"
            type="text"
            name="name"
            ref={register({
              required: "This fields is required",
              minLength: {
                value: 3,
                message: "This field is required 3 characters minimum length"
              }
            })}
          />
          <span className="text-danger">
            {errors.name && errors.name.message}
          </span>
        </div>

        <div>
          <label htmlFor="username">username :</label>
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
          <label htmlFor="email">email :</label>
          <input
            id="email"
            className="form-control"
            type="email"
            name="email"
            ref={register({
              required: "This fields is required",
              pattern: {
                value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                message: "Wrong pattern"
              }
            })}
          />
          <span className="text-danger">
            {errors.email && errors.email.message}
          </span>
        </div>

        <div>
          <label htmlFor="password">password :</label>
          <input
            id="password"
            className="form-control"
            type="password"
            name="password"
            ref={register({
              required: "This field is required",
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

        <div>
          <label htmlFor="confirm_password">Confirm password :</label>
          <input
            id="confirm_password"
            className="form-control"
            type="password"
            name="confirm_password"
            ref={register({
              minLength: {
                value: 3,
                message: "This field required at least 3 characters length"
              },
              required: "This field is required",
              validate: value =>
                value === getValues().password || "Password doesn't match"
            })}
          />
          <span className="text-danger">
            {errors.confirm_password && errors.confirm_password.message}
          </span>
        </div>

        <input
          onClick={handleSubmit(handleRegister)}
          type="submit"
          className="btn btn-primary mt-3"
        />
      </form>
    </div>
  );
}

export default Register;
