import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Our Dormitory Management System</h1>
        <p className="about-description">
          Welcome to the DMU Dormitory Management System! Our goal is to provide students with a modern, efficient, and user-friendly platform for managing dormitory accommodations.
        </p>
        <p className="about-description">
          The system allows students to easily search for available dormitories, submit requests, and receive updates on their status. Administrators can manage room assignments, track student data, and handle requests efficiently, making it easier for everyone.
        </p>
        <div className="about-info">
          <h2 className="section-title">Key Features</h2>
          <ul className="features-list">
            <li>Real-time room availability tracking</li>
            <li>Easy room booking and request submission</li>
            <li>User-friendly interface for students and admins</li>
            <li>Secure and efficient data management</li>
          </ul>
        </div>
        <div className="about-footer">
          <p>Join us in enhancing your student experience at Debre Markos University!</p>
        </div>
      </div>
    </div>
  );
}

export default About;
