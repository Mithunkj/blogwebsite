import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { config1 } from "./config";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditPost({ values }) {
  const {
    postedBy,
    title,
    desc,
    postdesc,
    setPostdesc,
    setTitle,
    setFile,
    setDesc,
    featchPost,
  } = values;
  let myName = JSON.parse(localStorage.getItem("user"));
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const nav = useNavigate();
  let id = useParams();
  id = id.postId;
  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:7000/post/${id}`,
        config1
      );
      nav("/");
    } catch (error) {
      console.log("error");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
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
  ];

  return (
    <>
      <Button className="me-2 mb-2" onClick={() => setShow(true)}>
        Edit Post
      </Button>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit post</Modal.Title>
          {myName._id === postedBy._id ? (
            <button
              onClick={() => {
                deletePost();
              }}
              className="btn btn-danger ms-3"
            >
              delete
            </button>
          ) : (
            ""
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form onSubmit={featchPost}>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="form-control my-2"
                placeholder="Title"
              />
              <textarea
                type="text"
                value={postdesc}
                onChange={(e) => {
                  setPostdesc(e.target.value);
                }}
                className="form-control my-2"
                placeholder="postdesc"
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
                alt="image"
              />
              <button type="submit" className="btn btn-primary m-2">
                submit
              </button>
              <NavLink to="/">
                <button className="btn btn-light">back</button>
              </NavLink>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditPost;
