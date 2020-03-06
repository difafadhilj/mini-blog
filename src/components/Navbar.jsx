import React from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  let admin = window.sessionStorage.getItem("admin");
  let token = window.sessionStorage.getItem("token");
  let id = window.sessionStorage.getItem("id");

  const logout = () => {
    let confirm = window.confirm("Anda yakin?");
    if (confirm) {
      window.sessionStorage.clear();
      history.push("/login");
    }
  };

  if (token && admin === "true") {
    return (
      <nav className="navbar navbar-expand-sm bg-success navbar-dark">
        <a className="navbar-brand" href="#">
          miniBlog
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Articles
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/article-create">
                Post Something
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/user">
                Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/comment">
                Comments
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else if (token !== null && admin === "false") {
    return (
      <nav className="navbar navbar-expand-sm bg-success navbar-dark">
        <a className="navbar-brand" href="#">
          miniBlog
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={"/myarticles/" + id}>
                My Article
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={"/article-create/"}>
                Create Article
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-sm bg-success navbar-dark">
      <a className="navbar-brand" href="#">
        miniBlog
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Sign In
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">
              Sign Up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
