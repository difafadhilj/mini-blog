import React, { useState, useMemo } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchResults, setSearchResults] = React.useState("");

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/articles");
      setData(result.data.article);
      setSearch(result.data.article);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);

  const activateArticle = async (id, articleStatus) => {
    let val;
    if (articleStatus === true) {
      val = false;
    } else {
      val = true;
    }
    try {
      const result = await axios.put(
        "http://localhost:8080/articles/" + id,
        { status: val },
        {
          headers: {
            Authorization: window.sessionStorage.getItem("token")
          }
        }
      );
      if (result.status === 201) {
        alert("Status Updated!");
        window.location.reload(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  const deleteArticle = async id => {
    try {
      const result = await axios.delete(
        "http://localhost:8080/articles/" + id,
        {
          headers: {
            Authorization: window.sessionStorage.getItem("token")
          }
        }
      );

      if (result.status === 200) {
        alert("Success");
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  React.useEffect(() => {
    const results = search.filter(article =>
      article["title"].toLowerCase().includes(searchResults.toLowerCase())
    );

    setData(results);
  }, [searchResults]);

  const handleChange = event => {
    setSearchResults(event.target.value);
  };

  if (window.sessionStorage.getItem("admin") === "true") {
    return (
      <>
        <div className="container" style={{ marginTop: 30 }}>
          <label htmlFor="search">Search : </label>
          <input
            id="search"
            className="form-control mr-sm-2 mb-5"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={searchResults}
            onChange={handleChange}
            autoComplete="off"
          />
          <div className="row">
            <div className="col-sm-10">
              {data.map((item, id) => (
                <div key={id}>
                  <div
                    style={{
                      border: "1px solid gray",
                      marginBottom: 10,
                      padding: 10
                    }}
                  >
                    <a>
                      <h2>
                        {item.title}
                        {(() => {
                          if (item.status === true) {
                            return (
                              <>
                                <b>&nbsp;(Active)</b>
                                <button
                                  onClick={() => activateArticle(item.id, true)}
                                  className="btn btn-danger"
                                >
                                  Block Thread
                                </button>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <b>&nbsp;(Blocked)</b>
                                <button
                                  onClick={() =>
                                    activateArticle(item.id, false)
                                  }
                                  className="btn btn-success"
                                >
                                  Activate Thread
                                </button>
                              </>
                            );
                          }
                        })()}
                      </h2>
                    </a>
                    <h5 className="text-gray">
                      Created by {!item.user ? "No name" : item.user.name} at
                      &nbsp;
                      {Date(item.createdAt).toString()}
                    </h5>
                    <div
                      className="fakeimg m-5"
                      style={{
                        background: "gray",
                        padding: 100
                      }}
                    >
                      Fake Image
                    </div>
                    <h4>
                      {item.content.substr(0, 100) + "...  "}
                      <a href={"/article/" + item.id}>Read more</a>
                    </h4>
                    <p align="right">
                      <button
                        onClick={() => deleteArticle(item.id)}
                        className="btn btn-danger"
                      >
                        Delete Article
                      </button>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Sidebar />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container" style={{ marginTop: 30 }}>
        <label htmlFor="search">Search : </label>
        <input
          id="search"
          className="form-control mr-sm-2 mb-5"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={searchResults}
          onChange={handleChange}
          autoComplete="off"
        />
        <div className="row">
          <div className="col-sm-10">
            {data.map((item, id) => (
              <div key={id}>
                {(() => {
                  if (item.status === true) {
                    return (
                      <div
                        style={{
                          border: "1px solid gray",
                          marginBottom: 10,
                          padding: 10
                        }}
                      >
                        <h2>{item.title}</h2>
                        <h5 className="text-gray">
                          Created by {!item.user ? "No name" : item.user.name}{" "}
                          at &nbsp;
                          {Date(item.createdAt).toString()}
                        </h5>
                        <div
                          className="fakeimg m-5"
                          style={{
                            background: "gray",
                            padding: 100
                          }}
                        >
                          Fake Image
                        </div>
                        <h4>
                          {item.content.substr(0, 100) + "...  "}
                          <a href={"/article/" + item.id}>Read more</a>
                        </h4>
                      </div>
                    );
                  }
                })()}
              </div>
            ))}
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
