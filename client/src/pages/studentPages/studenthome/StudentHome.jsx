import React from 'react'
import Hero from '../../../components/student/hero/Hero'

const StudentHome = () => {
    return (
        <div>
            <Hero />
            <div className="student-home-columns">
                <div className="student-home-column">
                    <h2>Welcome, and Welcome Back!</h2>
                    <p>Dear Students, Faculty, and Staff,</p>
                    <p>Welcome back to another exciting year at DMU! We are thrilled to have you here and are committed to providing a safe and comfortable environment for all. Let's make this year a memorable one!</p>
                </div>

                <div className="student-home-column">
                    <h2>DMU Dormitory Services</h2>
                    <p>Our dormitory services are designed to support the academic and personal well-being of all residents. From 24/7 security to on-site maintenance, our goal is to provide a seamless living experience. Our staff is always ready to assist with any needs you may have during your stay.</p>
                </div>

                <div className="student-home-column">
                    <h2>New Buildings</h2>
                    <p>We are excited to announce the opening of several new buildings designed to enhance student life. These new spaces offer modern amenities, study areas, and social spaces to foster a thriving community. We look forward to seeing how these new additions improve your experience at DMU.</p>
                </div>
            </div>
        </div>
    )
}

export default StudentHome
