import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { config } from "./compount/config";
import { NavLink, useNavigate } from "react-router-dom";
import EditPost from "./compount/EditPost";

function Post() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [postdesc, setPostdesc] = useState("");
  const nav = useNavigate();
  const featchPost = async (e) => {
    e.preventDefault();

    const values = new FormData();
    values.append("title", title);
    values.append("photo", file);
    values.append("description", desc);
    values.append("postdescription", postdesc);

    try {
      const res = await axios.post(
        "http://localhost:7000/post/createpost",
        values,
        config
      );
      nav("/");
      alert("Post submited succefully");
      console.log(res);
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: ["red", "blue", "pink", "black"] }],
      [{ size: ["small", false, "large", "huge"] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "size",
  ];

  return (
    <>
      <div className="container">
        <form onSubmit={featchPost}>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control my-2"
            placeholder="Title"
          />
          <textarea
            type="text"
            onChange={(e) => {
              setPostdesc(e.target.value);
            }}
            className="form-control my-2"
            placeholder="description"
          />

          <ReactQuill
            theme="snow"
            value={desc}
            onChange={(newValue) => {
              setDesc(newValue);
            }}
            modules={modules}
            formats={formats}
          />

          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <button type="submit" className="btn btn-primary m-2">
            submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Post;
