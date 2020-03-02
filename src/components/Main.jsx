import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "./Header";

function Main(props) {
  return (
    <div id="wrapper">
      <Header />
      <Navbar />
      <div className="container mt-5 mb-5">{props.children}</div>
      <Footer />
    </div>
  );
}

export default Main;
