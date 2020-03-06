import React, { useState, useMemo } from "react";
import axios from "axios";

const Comment = () => {
  const [data, setData] = useState([]);
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/comments", {
        headers: { Authorization: sessionStorage.getItem("token") }
      });
      console.log(result.data);
      setData(result.data);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);

  const updateStatus = async (id, CommentStatus) => {
    if (CommentStatus === true) {
      var val = false;
    } else {
      var val = true;
    }
    try {
      const result = await axios.put(
        "http://localhost:8080/Comments/" + id,
        { status: val },
        {
          headers: {
            Authorization: window.sessionStorage.getItem("token")
          }
        }
      );
      if (result.status === 200) {
        alert("Status Updated!");
        window.location.reload(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  const deleteComment = async id => {
    try {
      const result = await axios.delete(
        "http://localhost:8080/Comments/" + id,
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
    }
  };

  let no = 1;
  if (sessionStorage.getItem("admin") === "false") {
    return (
      <center>
        <h1 className="text-danger">Required admin previlleges!</h1>
      </center>
    );
  }
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Content</th>
            <th>User</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, id) => (
            <tr key={id}>
              <td>{no++}</td>
              <td>{item.content}</td>
              {item.user === null ? (
                <td>No Name</td>
              ) : (
                <td>{item.user.name}</td>
              )}
              <td>{item.status === true ? "Active" : "Blocked"}</td>
              <td>
                {item.status ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => updateStatus(item.id, true)}
                  >
                    Block
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => updateStatus(item.id, false)}
                  >
                    Activate
                  </button>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteComment(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Comment;
