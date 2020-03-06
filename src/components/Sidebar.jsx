import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <div className="col-sm-2">
        <h3>Recent Post</h3>
        <p>Lorem ipsum dolor sit ame.</p>
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Active
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">
              Disabled
            </a>
          </li>
        </ul>
        <hr className="d-sm-none" />
      </div>
    );
  }
}

export default Sidebar;
