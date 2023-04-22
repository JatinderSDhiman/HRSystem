import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const formData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  address: "",
  city: "",
  phone: "",
};

const Register = () => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    formData[`${event.target.name}`] = event.target.value;
  };

  const addUser = async (data) => {
    try {
      console.log(data);
      const res = await axios.post("/auth/register", data);

      if (res.status === 201) {
        window.alert("Registration successfull.");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.status);
      if (error.status === 422) {
        window.alert("User is already registered.");
      } else {
        window.alert("Registration unsuccessfull.");
        console.log(error);
      }
    }
  };

  const registerFormHandler = async (event) => {
    event.preventDefault();
    console.log(formData);
    addUser(formData);
  };

  return (
    <div className="container">
      <div className="my-2 py-4">
        <h1 className="display-5">Register</h1>
      </div>

      <form
        className=" container w-75 border border-success rounded px-4 shadow-lg p-3 mb-5 bg-body rounded"
        method="POST"
        onChange={handleChange}
        onSubmit={registerFormHandler}
      >
        <div className="d-flex flex-column ">
          <div className="my-3 d-flex">
            <input
              className="form-control mx-3"
              type="text"
              id="firstName"
              required
              name="firstName"
              placeholder="First Name"
            />

            <input
              className="form-control mx-3"
              type="text"
              id="lastName"
              required
              name="lastName"
              placeholder="Last Name"
            />
          </div>

          <div className="my-3 d-flex">
            <input
              className="form-control mx-3"
              type="text"
              id="email"
              required
              name="email"
              placeholder="Email"
            />
            <input
              className="form-control mx-3"
              type="password"
              id="password"
              name="password"
              required
              placeholder="Password"
            />
          </div>
          <div className="my-3 d-flex">
            <input
              className="form-control mx-3"
              type="text"
              id="address"
              required
              name="address"
              placeholder="Address"
            />
            <input
              className="form-control mx-3"
              type="text"
              id="city"
              name="city"
              required
              placeholder="City"
            />
          </div>
          <div className="my-3 d-flex">
            <input
              className="form-control mx-3"
              type="tel"
              id="phone"
              required
              name="phone"
              placeholder="Phone Number"
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-primary btn-lg m-4 px-4"
              type="submit"
            >
              REGISTER
            </button>

            <button
              type="reset"
              className="btn btn-outline-danger btn-lg m-4 px-4"
            >
              RESET
            </button>
          </div>
        </div>
      </form>
      <div className="text-center">
        <p className="lead">
          {" "}
          Login to your account 👇 if you already have one.
        </p>
        <NavLink className="btn btn-outline-secondary btn-lg" to="/login">
          Login
        </NavLink>
      </div>
    </div>
  );
};
export default Register;
