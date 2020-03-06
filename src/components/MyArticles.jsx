import React, { useState, useMemo } from "react";
import axios from "axios";

const MyArticles = props => {
  const [data, setData] = useState([]);
  let id = props.match.params.id;

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:8080/articles/user/" + id,
        {
          headers: {
            Authorization: window.sessionStorage.getItem("token")
          }
        }
      );
      setData(result.data.article);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);

  if (data.length === 0) {
    return (
      <>
        <center>
          <h3>You Don't have any article</h3>
          <a href="/article-create" className="btn btn-success">
            Create Article
          </a>
        </center>
      </>
    );
  }
  return (
    <>
      <div className="container" style={{ marginTop: 30 }}>
        <div className="row">
          <div>
            {data.map((item, id) => (
              <div key={id}>
                {(() => {
                  if (item.status) {
                    return (
                      <div
                        style={{
                          border: "1px solid gray",
                          marginBottom: 10,
                          padding: 10
                        }}
                      >
                        <a href={"/article/" + item.id}>
                          <h2>{item.title}</h2>
                        </a>
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
        </div>
      </div>
    </>
  );
};

export default MyArticles;
