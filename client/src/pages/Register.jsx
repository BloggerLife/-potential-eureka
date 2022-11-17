import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "../img/user.svg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
        profilePic: image,
      });
      res.data && window.location.replace("/login"); 
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/"
          id="file"
          name=""
          onChange={handleImgUpload}
        />
        <label className="avatar" htmlFor="file">
          {image ? <img src={image} alt="ProfilePicture" /> : <img
            src={Avatar}
            alt="Avatar"
          />}
        </label>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Register</button>
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
