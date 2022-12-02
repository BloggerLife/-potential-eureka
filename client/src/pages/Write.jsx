import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [image, setImage] = useState(state?.image || "");
  const [cat, setCat] = useState(state?.cat || "");
  const { user, loading  } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const navigate = useNavigate()

  const handleImgUpload = (e)=>{
    const file = e.target.files[0];

    transFile(file)
  }

  const transFile = (file)=>{
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        setImage(reader.result)
      }
    } else {
      setImage("")
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc: value,
      username: user.username, 
      userImg: user.profilePic,
      cat,
      image,
    };

    try {
      state
        ? await axiosInstance.put(`/posts/${state.id}`, {
            title: value,
            desc: value,
            username: value, 
            userImg: value,
            cat: value,
            image: value,
          })
        : await axiosInstance.post(`/posts`, newPost);
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            accept="image/"
            onChange={handleImgUpload}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Editing Mode</button>
            <button disabled={
              loading === <div className="loaderContainer">
                <div className="loader"></div>
              </div>
            } 
            onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "health"}
              name="cat"
              value="health"
              id="health"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="health">Health</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "hobbies"}
              name="cat"
              value="hobbies"
              id="hobbies"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="hobbies">Hobbies</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "finance"}
              name="cat"
              value="finance"
              id="finance"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="finance">Finance</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "books"}
              name="cat"
              value="books"
              id="books"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="books">Books</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
