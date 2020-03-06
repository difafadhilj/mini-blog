import React, { useState, useMemo } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const CommentsBasedArticle = props => {
  const [data, setData] = useState([]);
  let id = props.match.params.id;

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/comments/" + id);
      console.log(result);
      //   if (result.status) {
      //     console.log(result.data.article);
      //     setData(result.data.article);
      //   }
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);

  return <></>;
};

export default CommentsBasedArticle;
