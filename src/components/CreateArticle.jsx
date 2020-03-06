import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

function CreateArticle() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const articleCreateHandler = async data => {
    try {
      const result = await axios.post(
        "http://localhost:8080/articles",
        {
          title: data.title,
          content: data.content
        },
        {
          headers: {
            Authorization: window.sessionStorage.getItem("token")
          }
        }
      );

      if (result.status === 201) {
        alert(result.data.status);
        history.push("/myarticles/" + window.sessionStorage.getItem("id"));
      } else {
        throw new Error("Article creating failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Create an article</h1>
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <label htmlFor="title">Title :</label>
          <input
            id="title"
            className="form-control"
            type="text"
            name="title"
            ref={register({
              required: "This fields is required",
              maxLength: {
                value: 255,
                message: "This field is maximum 255 characters length"
              }
            })}
          />
          <span className="text-danger">
            {errors.title && errors.title.message}
          </span>
        </div>

        <div>
          <label htmlFor="content">Content :</label>
          <textarea
            id="content"
            className="form-control"
            type="text"
            name="content"
            rows="15"
            ref={register({
              required: "This fields is required",
              minLength: {
                value: 100,
                message: "This field is required 100 characters minimum length"
              }
            })}
          />
          <span className="text-danger">
            {errors.content && errors.content.message}
          </span>
        </div>

        <input
          type="submit"
          onClick={handleSubmit(articleCreateHandler)}
          className="btn btn-primary mt-3"
          value="Post"
        />
      </form>
    </div>
  );
}

export default CreateArticle;
