import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const [form, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/register", {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        roles: ["USER"]
      });

      console.log(result);

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

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name :</label>
        <input
          id="name"
          value={form.name}
          className="form-control"
          type="text"
          name="name"
          onChange={updateField}
        />

        <label htmlFor="username">username :</label>
        <input
          id="username"
          value={form.username}
          className="form-control"
          type="text"
          name="username"
          onChange={updateField}
        />

        <label htmlFor="email">email :</label>
        <input
          id="email"
          value={form.email}
          className="form-control"
          type="email"
          name="email"
          onChange={updateField}
        />

        <label htmlFor="password">password :</label>
        <input
          id="password"
          value={form.password}
          className="form-control"
          type="password"
          name="password"
          onChange={updateField}
        />

        <label htmlFor="confirm_password">Confirm password :</label>
        <input
          id="confirm_password"
          value={form.confirm_password}
          className="form-control"
          type="password"
          name="confirm_password"
          onChange={updateField}
        />

        <input type="submit" className="btn btn-primary mt-3" />
      </form>
    </div>
  );
}

export default Register;
