import React, { useState, useMemo } from "react";
import axios from "axios";

const User = () => {
  const [data, setData] = useState([]);
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/users", {
        headers: { Authorization: sessionStorage.getItem("token") }
      });
      console.log(result);
      setData(result.data);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);

  const updateStatus = async (id, userStatus) => {
    let val;
    if (userStatus === true) {
      val = false;
    } else {
      val = true;
    }
    try {
      const result = await axios.put(
        "http://localhost:8080/users/" + id,
        { status: val },
        {
          headers: {
            Authorization: window.sessionStorage.getItem("token")
          }
        }
      );
      console.log(result);

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
      const result = await axios.delete("http://localhost:8080/users/" + id, {
        headers: {
          Authorization: window.sessionStorage.getItem("token")
        }
      });

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
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, id) => (
            <tr key={id}>
              <td>{no++}</td>
              <td>
                <a>{item.name}</a>
              </td>
              <td>{item.email}</td>
              {item.admin ? <td>Admin</td> : <td>User</td>}
              <td>
                {!item.admin ? (
                  <>
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
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteArticle(item.id)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default User;
