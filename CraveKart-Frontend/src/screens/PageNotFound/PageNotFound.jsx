import React from "react";
import "./pageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <div className="page-not-found-content">
        <h1 className="page-not-found-title">404</h1>
        <h2 className="page-not-found-subtitle">Page Not Found</h2>
        <p className="page-not-found-message">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <a href="/" className="page-not-found-home-link">Go to Homepage</a>
      </div>
    </div>
  );
};

export default PageNotFound;
