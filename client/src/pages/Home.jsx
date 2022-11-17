import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactReadMoreReadLess from "react-read-more-read-less";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
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
      </div>
    </div>
  );
};

export default Home;
