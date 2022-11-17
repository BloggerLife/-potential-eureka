import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DOMPurify from "dompurify";
import Avatar from "../img/user.svg";

const Single = () => {
  const [post, setPost] = useState({});
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { user } = useContext(AuthContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${postId}`, {
        data: { username: user.username },
      });
      navigate("/")
    } catch (err) {}
  };

  // const getText = (html) =>{
  //   const doc = new DOMParser().parseFromString(html, "text/html")
  //   return doc.body.textContent
  // }

  return (
    <>
    <div className="single">
      <div className="content">
        <img src={post?.image} alt="postImage" />
        <div className="user">
          {<img src={Avatar} alt="" /> && <img
            src={post.userImg}
            alt=""
          />}
          <div className="info">
            <span>{post.username}</span>
            <p>{new Date(post.createdAt).toDateString()}</p>
          </div>
          {user?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p> 
        <p class="sharethis-inline-share-buttons"></p>  
      </div>  
      <Menu cat={post.cat}/>
    </div>
    </>
  );
};

export default Single;
