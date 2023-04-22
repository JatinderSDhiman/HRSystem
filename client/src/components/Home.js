import React from "react";

const Home = (props) => {
  return (
    <div className="container d-flex flex-column align-items-center mydiv">
      <p className="display-4 my-4 py-4">WELCOME</p>
      {!props.isLoggedIn && (
        <h1 className="lead my-4">Login or Register to manage HR services .</h1>
      )}
      {props.isLoggedIn && props.user.role === "Employee" && (
        <h1 className="lead my-4">
          {props.user.firstName} {props.user.lastName}
        </h1>
      )}
      {props.isLoggedIn && props.student.role === "Admin" && (
        <h1 className="lead my-4">{props.user.firstName}</h1>
      )}
    </div>
  );
};

export default Home;
