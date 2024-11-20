import React, { useState } from "react";
import JobPortal from "../assets/images/JobPortal.jpeg";

const formInitialData = {
  name: "",
  email: "",
  password: "",
  location: "",
};

const Register = () => {
  const [formData, setFormData] = useState(formInitialData);
  const [touched, setTouched] = useState({});

  const onChange = (event) => {
    const id = event?.target?.id;
    const value = event?.target?.value ?? "";
    setFormData({ ...formData, [id]: value });
    setTouched({ ...touched, [id]: true });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email?.trim());
  };

  const isValidPassword = (password = "") => {
    return password?.trim()?.length < 6 || !password?.trim()?.length
      ? false
      : true;
  };

  const isFieldInvalid = (field) => {
    if (!touched[field]) return false; // Don't validate if the field is not touched
    switch (field) {
      case "email":
        return !isValidEmail(formData.email?.trim());
      case "password":
        return !isValidPassword(formData.password?.trim());
      default:
        return formData[field]?.trim()?.length < 3; // For other fields, check if blank
    }
  };

  const isFormInvalid = () => {
    const isAnyBlankField = Object.values(formData).some(
      (value) => value === "" || value === undefined
    );
    return (
      isAnyBlankField ||
      isFieldInvalid("name") ||
      isFieldInvalid("email") ||
      isFieldInvalid("password") ||
      isFieldInvalid("location")
    );
  };

  const onRegisterClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const copiedFormData = { ...formData };
    const trimmedData = Object.fromEntries(
      Object.entries(copiedFormData).map(([key, value]) => [key, value?.trim()])
    );
    setFormData(trimmedData);
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
          <form id="registrationForm">
            {/* Name Field */}
            <div className="form-floating mb-3">
              <input
                type="text"
                id="name"
                className={`form-control ${
                  isFieldInvalid("name") ? "is-invalid" : ""
                }`}
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={onChange}
              />
              <label htmlFor="name">Full Name</label>
            </div>

            {/* Email Field */}
            <div className="form-floating mb-3">
              <input
                type="email"
                id="email"
                className={`form-control ${
                  isFieldInvalid("email") ? "is-invalid" : ""
                }`}
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
                className={`form-control ${
                  isFieldInvalid("password") ? "is-invalid" : ""
                }`}
                placeholder="Password"
                required
                value={formData.password}
                onChange={onChange}
              />
              <label htmlFor="password">Password</label>
            </div>

            {/* Location Field */}
            <div className="form-floating mb-3">
              <input
                type="text"
                id="location"
                className={`form-control ${
                  isFieldInvalid("location") ? "is-invalid" : ""
                }`}
                placeholder="Location"
                required
                value={formData.location}
                onChange={onChange}
              />
              <label htmlFor="location">Location</label>
            </div>

            {/* Register Button */}
            <button
              className="btn btn-primary w-100 py-2 rounded-pill"
              disabled={isFormInvalid()}
              onClick={onRegisterClick}
            >
              Register
            </button>
          </form>

          {/* Already Registered */}
          <div className="text-center mt-3">
            <span className="text-muted">Already have an account? </span>
            <a href="/login" className="text-primary fw-bold">
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
