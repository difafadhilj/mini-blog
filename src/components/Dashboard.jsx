import React, { useState, useMemo } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [data, setData] = useState([]);
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/articles");
      if (result.status) {
        console.log(result.data.article);
        setData(result.data.article);
      }
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);

  return (
    <>
      <div className="container" style={{ marginTop: 30 }}>
        <div className="row">
          <div className="col-sm-10">
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
                        <a href="">
                          <h2>{item.title}</h2>
                        </a>
                        <h5>{item.createdAt}</h5>
                        <div
                          className="fakeimg m-5"
                          style={{
                            background: "gray",
                            padding: 100
                          }}
                        >
                          Fake Image
                        </div>
                        <h4>{item.content}.</h4>
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
