import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const Navbar = (props) => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    props.setIsLoggedIn(false);
    props.setStudent(null);
    try {
      const response = await axios.post("/student/signOut");
      window.alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <p className="lead m-3">HR Management System</p>
        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item m-3">
              <NavLink className="nav-link" to="/">
                HOME
              </NavLink>
            </li>

            {props.isLoggedIn && (
              <li className="nav-item m-3">
                <NavLink className="nav-link" to="/students">
                  STUDENTS
                </NavLink>
              </li>
            )}

            {props.isLoggedIn && (
              <li className="nav-item m-3">
                <NavLink className="nav-link" to="/courses">
                  COURSES
                </NavLink>
              </li>
            )}
            {props.isLoggedIn && props.student.role === "Student" && (
              <li className="nav-item m-3">
                <NavLink className="nav-link" to="/myCourses">
                  MY COURSES
                </NavLink>
              </li>
            )}

            {props.isLoggedIn && props.student.role === "Admin" && (
              <li className="nav-item m-3">
                <NavLink className="nav-link" to="/addCourse">
                  ADD COURSE
                </NavLink>
              </li>
            )}

            {!props.isLoggedIn && (
              <li className="nav-item m-3">
                <NavLink className="nav-link" to="/register">
                  REGISTER
                </NavLink>
              </li>
            )}

            {!props.isLoggedIn && (
              <li className="nav-item m-3">
                <NavLink className="nav-link" to="/login">
                  LOGIN
                </NavLink>
              </li>
            )}

            {props.isLoggedIn && (
              <li className="nav-item m-3">
                <NavLink className="nav-link" onClick={logoutHandler}>
                  LOGOUT
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
