import React, { Component } from "react";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <a class="navbar-brand" href="#">
          miniBlog
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/">
                Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">
                Sign In
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/register">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
