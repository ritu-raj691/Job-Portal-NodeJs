import React from "react";
import { Link } from "react-router-dom";
import BackgroundVideo from "../assets/videos/Background.mp4";
import JobPortal from "../assets/images/JobPortal.jpeg";
import "../styles/Homepage.css";

const Homepage = () => {
  return (
    <>
      <video id="background-video" autoPlay muted loop>
        <source src={BackgroundVideo} />
      </video>
      <div className="card-container">
        <div className="card shadow-lg border-0">
          {/* Job Portal Logo */}
          <div className="text-center">
            <img
              src={JobPortal}
              alt="Job Portal Logo"
              className="img-fluid"
              style={{ maxWidth: "220px" }}
            />
          </div>
        </div>
        <h5 className="card-body pt-4">No #1 Career Platform</h5>
        <hr />
        <p className="card-text">
          Search and manage your job with ease. Free and open source job portal
          application.
        </p>
        <div className="mt-3">
          <span className="">
            Not a user, Register <Link to="/register">here</Link>
          </span>
        </div>
        <div className="mt-3">
          <span className="">
            Already an account, Click <Link to="/login">here</Link> to login
          </span>
        </div>
      </div>
    </>
  );
};

export default Homepage;
