import React, { useState } from "react";
import JobPortal from "../assets/images/JobPortal.jpeg";

const formInitialData = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(formInitialData);

  const onChange = (event) => {
    const id = event?.target?.id;
    const value = event?.target?.value ?? "";
    setFormData({ ...formData, [id]: value });
  };

  const onLoginClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("formdata login", formData);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-lg border-0"
        style={{ minWidth: "400px", borderRadius: "15px" }}
      >
        <div className="card-body p-4">
          {/* Job Portal Logo */}
          <div className="text-center mb-4">
            <img
              src={JobPortal}
              alt="Job Portal Logo"
              className="img-fluid"
              style={{ maxWidth: "220px" }}
            />
          </div>
          <div id="alert" className="alert d-none"></div>
          <form id="loginForm">
            {/* Email Field */}
            <div className="form-floating mb-3">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={onChange}
              />
              <label htmlFor="email">Email Address</label>
            </div>
            {/* Password Field */}
            <div className="form-floating mb-3">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required
                value={formData.password}
                onChange={onChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            {/*Login Button */}
            <button
              className="btn btn-primary w-100 py-2 rounded-pill"
              onClick={onLoginClick}
            >
              Login
            </button>
          </form>

          {/* New User */}
          <div className="text-center mt-3">
            <span className="text-muted">New User? </span>
            <a href="/register" className="text-primary fw-bold">
              Register here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
