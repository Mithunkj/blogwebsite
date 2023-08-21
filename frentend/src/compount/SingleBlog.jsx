import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "./config";
import EditPost from "./EditPost";

function SingleBlog() {
  const [post, setPost] = useState({});
  const [postedBy, setPostedBy] = useState({});
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [postdesc, setPostdesc] = useState("");
  let myName = JSON.parse(localStorage.getItem("user"));
  const id = useParams();
  const nav = useNavigate();

  const getPost = async () => {
    const res = await axios.get(
      `http://localhost:7000/post/${id.postId}`,
      config
    );
    const resData = await res.data.data;
    setPost(resData);
    setPostedBy(resData.postedBy);
    setTitle(resData.title);
    setFile(resData.photo);
    setDesc(resData.description);
    setPostdesc(resData.postdescription);
  };
  const featchPost = async (e) => {
    e.preventDefault();

    const values = new FormData();
    values.append("title", title);
    values.append("photo", file);
    values.append("description", desc);

    try {
      const res = await axios.put(
        `http://localhost:7000/post/${id.postId}`,
        values,
        config
      );
      nav("/");
      alert("send this post");
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  function formatDate(date) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);

    // Split the formatted date into day, month, and year parts
    const [month, day, year] = formattedDate.split(" ");

    // Convert the month abbreviation to uppercase
    const capitalizedMonth = month.toUpperCase();

    // Return the formatted date with uppercase month abbreviation and desired format
    return `${day} ${capitalizedMonth} ${year} `;
  }
  return (
    <>
      <div className="container  mb-2 p-lg-5">
        <div className="d-flex">
          <div>
            <h5 className="mb-0">{postedBy.user}</h5>
            <pre className="mb-0 ">{formatDate(post.updatedAt)}</pre>
          </div>

          <div className="w-100 text-end">
            {myName._id === postedBy._id ? (
              <EditPost
                values={{
                  postedBy,
                  title,
                  file,
                  desc,
                  postdesc,
                  setPostdesc,
                  setTitle,
                  setFile,
                  setDesc,
                  featchPost,
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <hr />
        <h2 className="display-4 fw-bold">{post.title}</h2>
        {post.photo ? (
          <>
            <div
              style={{
                width: "100%",
                maxHeight: "500px",
                display: "flex",
                overflow: "hidden",
                margin: "20px auto",
              }}
            >
              <img
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  width: "100%",
                }}
                src={post.photo ? post.photo : ""}
                alt=""
              />
            </div>
          </>
        ) : (
          ""
        )}
        <div style={{ backgroundColor: "#f5f5f5" }} className="p-3">
          <p>{post.postdescription}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
      </div>
    </>
  );
}

export default SingleBlog;
