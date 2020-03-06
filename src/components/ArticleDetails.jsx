import React, { useState, useMemo } from "react";
import axios from "axios";

const ArticleDetails = props => {
  const [data, setData] = useState([]);
  const [comment, setComments] = useState([]);
  const id = props.match.params.id;
  const [form, setValues] = useState({
    content: ""
  });

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/articles/" + id);
      setData([result.data.article]);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);

  const blockHandler = async (id, commentStatus) => {
    console.log(commentStatus);
    let val;
    if (commentStatus === true) {
      val = false;
    } else if (commentStatus === false) {
      val = true;
    }

    try {
      const result = await axios.put(
        "http://localhost:8080/comments/" + id,
        {
          status: val
        },
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

  const deleteHandler = async id => {
    try {
      const result = await axios.delete(
        "http://localhost:8080/comments/" + id,
        {
          headers: {
            Authorization: window.sessionStorage.getItem("token")
          }
        }
      );

      if (result.status === 200) {
        alert("Success");
      }
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  const submitHandler = async id => {
    try {
      const result = await axios.post(
        "http://localhost:8080/comments/" + id,
        {
          content: form.content
        },
        {
          headers: {
            Authorization: window.sessionStorage.getItem("token")
          }
        }
      );

      if (result.status === 201) {
        alert("Success");
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  function renderComments(id) {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/comments/" + id);
      setComments(result.data);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <div className="container" style={{ marginTop: 30 }}>
        <div className="row">
          {data.map((item, id) => (
            <div
              style={{
                marginBottom: 10,
                padding: 10
              }}
              key={id}
            >
              <h2>{item.title}</h2>
              <h5 className="text-gray">
                Created by {!item.user ? "No name" : item.user.name} at &nbsp;
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
              <h4 style={{ marginBottom: 30 }}>{item.content}.</h4>
              <hr />
              <p align="center">Comments</p>
              <hr />
            </div>
          ))}
        </div>

        <center>
          <button
            className="btn btn-primary mb-3"
            onClick={() => renderComments(id)}
          >
            Show Comments
          </button>
        </center>
        {comment.map((item, id) => (
          <div key={id}>
            <div
              style={{
                border: "1px solid gray",
                padding: 20,
                borderRadius: 15
              }}
            >
              {(() => {
                if (item.status === false) {
                  return (
                    <h5 className="text-muted">
                      This comment has blocked by Admin
                    </h5>
                  );
                } else {
                  return (
                    <>
                      <h4>{!item.user ? "No Name" : item.user.name}</h4>
                      <p>{item.content}</p>
                    </>
                  );
                }
              })()}
              {(() => {
                if (window.sessionStorage.getItem("admin") === "true") {
                  if (item.status === true) {
                    return (
                      <a
                        className="btn btn-warning"
                        onClick={() => blockHandler(item.id, true)}
                      >
                        Block Comment
                      </a>
                    );
                  } else {
                    return (
                      <a
                        className="btn btn-success"
                        onClick={() => blockHandler(item.id, false)}
                      >
                        Show Comment
                      </a>
                    );
                  }
                }
              })()}
              &nbsp;
              {(() => {
                if (sessionStorage.getItem("admin") === "true") {
                  return (
                    <a
                      className="btn btn-danger"
                      onClick={() => deleteHandler(item.id)}
                    >
                      Delete Comment
                    </a>
                  );
                }
              })()}
            </div>
            <br />
          </div>
        ))}

        {(() => {
          if (!window.sessionStorage.getItem("token")) {
            return "";
          } else {
            return (
              <div>
                <label htmlFor="comment">Your comment : </label>
                <textarea
                  name="content"
                  className="form-control"
                  id="comment"
                  rows="5"
                  value={form.content}
                  onChange={updateField}
                ></textarea>
                <br />
                <button
                  onClick={() => submitHandler(id)}
                  className="btn btn-primary"
                >
                  Post
                </button>
              </div>
            );
          }
        })()}
      </div>
    </>
  );
};

export default ArticleDetails;
