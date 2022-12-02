import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactReadMoreReadLess from "react-read-more-read-less";
import useFetch from "../hooks/useFetch";

const Home = () => {

  const cat = useLocation().search
  const { data, loading, error } = useFetch(`/posts${cat}`);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="home">
      <div className="posts">
      {loading ? (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      ) : (
        <>
        {data.map((post) => (
          <div className="post" key={post._id}>
            <div className="img">
              <img src={post.image} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post._id}`}>
                <h1>{post.title}</h1>
              </Link>
              <div className="para">
                <ReactReadMoreReadLess
                  charLimit={500}
                  className="text"
                  readMoreText={ 
                  <Link className="link" to={`/post/${post._id}`}>
                    <button>Read More</button>
                  </Link>}
                  >
                  {getText(post.desc)}
                </ReactReadMoreReadLess>
              </div>
            </div>
          </div>
        ))}
        </>
      )}
      </div>
    </div>
  );
};

export default Home;
