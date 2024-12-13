import React from "react";
import "./styles.css";

const All = () => {
  return (
    <div className="container">
      <h1>All Courses</h1>
      <div className="course-grid">
        <div className="course-card">
          <img src="https://via.placeholder.com/300x150" alt="Course 1" />
          <h3>Python Objects 101: How to</h3>
        </div>
      </div>
    </div>
  );
};

export default All;
