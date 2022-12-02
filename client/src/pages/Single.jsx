import React from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DOMPurify from "dompurify";
import Avatar from "../img/user.svg";
import useFetch from "../hooks/useFetch";

const Single = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const postId = location.pathname.split("/")[2];
  
  const { data, loading, error } = useFetch(`/posts/${postId}`);

  const post = data;

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${postId}`, {
        data: { username: user.username },
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  // const getText = (html) =>{
  //   const doc = new DOMParser().parseFromString(html, "text/html")
  //   return doc.body.textContent
  // }
  console.log(user);
  return (
    <div className="single">
      {loading ? (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      ) : (
      <>
          <div className="content" key={post._id}>
            <img src={post?.image} alt="postImage" />
            <div className="user">
              {<img src={Avatar} alt="" /> && <img
                src={post.userImg}
                alt=""
              />}
              <div className="info">
                <Link to={`/?user=${post.username}`} className="link">
                  <span>{post.username}</span>
                </Link>
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
          </div>  
          <Menu cat={post.cat}/>
      </>
    )}
    </div>
  );
};

export default Single;
