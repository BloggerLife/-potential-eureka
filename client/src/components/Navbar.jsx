import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./fab.css";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const logout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    await axiosInstance.post("/auth/logout");
  };

  function actionToggle() {
    const action = document.querySelector('.action');
    action.classList.toggle('active')
  }

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=health">
            <h6>HEALTH</h6>
          </Link>
          <Link className="link" to="/?cat=hobbies">
            <h6>HOBBIES</h6>
          </Link>
          <Link className="link" to="/?cat=finance">
            <h6>FINANCE</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=books">
            <h6>BOOKS</h6>
          </Link>
          <span>{user?.username}</span>
          {user ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            {user ? (
              <Link className="link" to="/write">
                Write
              </Link>
            ) : (
              <Link className="link" to="/login">
                Write
              </Link>
            )}
          </span>
        </div>
        <span className="action" onClick={actionToggle}>
            <p className="littleMenu">Menu</p>
            <ul>
                <span>
                  <small className="heading">Categories</small>
                  <Link className="link" to="/?cat=art">
                    <h6>ART</h6>
                  </Link>
                  <Link className="link" to="/?cat=health">
                    <h6>HEALTH</h6>
                  </Link>
                  <Link className="link" to="/?cat=hobbies">
                    <h6>HOBBIES</h6>
                  </Link>
                  <Link className="link" to="/?cat=finance">
                    <h6>FINANCE</h6>
                  </Link>
                  <Link className="link" to="/?cat=design">
                    <h6>DESIGN</h6>
                  </Link>
                  <Link className="link" to="/?cat=books">
                    <h6>BOOKS</h6>
                  </Link>
                </span>
                <span className="contain">
                  <span>{user?.username}</span>
                  {user ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <Link className="link" to="/login">
                      Login
                    </Link>
                  )}
                  <span className="write">
                  {user ? (
                    <Link className="link" to="/write">
                      Write
                    </Link>
                  ) : (
                    <Link className="link" to="/login">
                      Write
                    </Link>
                  )}
                </span>
              </span>
          </ul>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
