import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const formData = {
  email: "",
  password: "",
};

const Login = (props) => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    formData[`${event.target.name}`] = event.target.value;
  };

  const loginUser = async (data) => {
    try {
      const response = await axios.post("/auth/login", formData);
      console.log(response.data.userLogin);

      props.setUser(response.data.userLogin);

      props.setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      window.alert("Invalid Credentials");
      console.log(error.response.data);
    }
  };

  const loginFormHandler = (event) => {
    event.preventDefault();
    loginUser(formData);
  };

  return (
    <div className="container">
      <div className="my-2 py-4">
        <h1 className="display-5">Login</h1>
      </div>
      <form
        className=" container w-50 border border-success rounded px-4 shadow-lg p-3 mb-5 bg-body rounded"
        onChange={handleChange}
        method="POST"
        onSubmit={loginFormHandler}
      >
        <div className="d-flex flex-column ">
          <div className="my-4">
            <label htmlFor="email">Email</label>

            <input
              className="form-control"
              type="text"
              id="email"
              name="email"
              required
            />
          </div>

          <div className="my-4">
            <label htmlFor="email">Password</label>

            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-primary btn-lg m-4 px-4"
              type="submit"
            >
              LOGIN
            </button>

            <button
              className="btn btn-outline-danger btn-lg m-4 px-4"
              type="reset"
            >
              RESET
            </button>
          </div>
        </div>
      </form>
      <div className="text-center">
        <p className="lead">
          You can create a new account 👇 quickly if you do not have one.
        </p>
        <NavLink className="btn btn-outline-secondary btn-lg" to="/register">
          Register
        </NavLink>
      </div>
    </div>
  );
};
export default Login;
