import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
  const [form, setValues] = useState({
    username: "",
    password: ""
  });
  let history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/login", {
        username: form.username,
        password: form.password
      });

      window.sessionStorage.setItem("role", result.data.role);
      window.sessionStorage.setItem("token", result.data.accessToken);
      window.sessionStorage.setItem("userId", result.data.id);

      if (result.status === 200) {
        if (result.data.role === "ADMIN") {
          history.push("/admin");
        } else {
          history.push("/");
        }
      }
    } catch (err) {
      console.log(err);
      alert("Login gagal");
    }
  };

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  if (window.sessionStorage.getItem("token")) return <h1>Sudah Login</h1>;
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label for="username">username :</label>
        <input
          id="username"
          value={form.username}
          className="form-control"
          type="text"
          name="username"
          onChange={updateField}
        />

        <label for="password">password :</label>
        <input
          id="password"
          value={form.password}
          className="form-control"
          type="password"
          name="password"
          onChange={updateField}
        />

        <input
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary mt-3"
        />
      </form>
    </div>
  );
}

export default Login;
