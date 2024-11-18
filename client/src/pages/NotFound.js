import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <p>Page Not Found</p>
      <Link className="btn btn-success" to="/">
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
