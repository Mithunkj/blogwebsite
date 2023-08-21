import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style/style.css";
import { config } from "./compount/config";
import { NavLink } from "react-router-dom";

function Home() {
  const [allPost, setAllPost] = useState([]);
  const getPost = async () => {
    try {
      const res = await axios.get("http://localhost:7000/post/", config);
      console.log(res.data.data);
      const resData = await res.data.data;
      setAllPost(resData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  console.log(allPost);

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
      <div className="container-fluid bg-light">
        <div className="container">
          {allPost.map((item) => {
            return (
              <>
                <NavLink to={`/post/${item._id}`}>
                  <div className="row">
                    {item.photo ? (
                      <>
                        <div
                          style={{
                            maxHeight: "300px",
                            display: "flex",
                            overflow: "hidden",
                          }}
                          className="col-6 p-3"
                        >
                          <img
                            style={{
                              objectFit: "cover",
                              objectPosition: "center center",
                              width: "100%",
                            }}
                            src={item.photo ? item.photo : ""}
                            alt=""
                          />
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    <div className="col-6 p-3 overflow-hidden">
                      <h2>{item.postedBy.userName}</h2>{" "}
                      <p>{formatDate(item.updatedAt)}</p>
                      <h2 className="fw-bold">{item.title}</h2>
                      <p>{item.postdescription.slice(0, 200)}...</p>
                    </div>
                  </div>
                </NavLink>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
