import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <div className="col-sm-2">
        <h2>About Me</h2>
        <h5>Photo of me:</h5>
        <div className="fakeimg">Fake Image</div>
        <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
        <h3>Some Links</h3>
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
