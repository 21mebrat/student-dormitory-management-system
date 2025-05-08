# Dormitory Student Management System

A comprehensive web application designed to manage student dormitories efficiently. Built using the MERN stack (MongoDB, Express, React, Node.js), this system provides an intuitive interface for students and administrators to handle dormitory-related activities.



## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features
- **Student Registration**: Register and manage student details.
- **Dormitory Allocation**: Assign rooms to students based on availability.
- **Admin Panel**: Monitor and manage student records, rooms, and allocations.
- **Authentication**: Secure login using JWT (JSON Web Tokens).
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Technologies Used
- **MongoDB**: Database
- **Express.js**: Backend framework
- **React.js**: Frontend framework
- **Node.js**: Server environment
- **JWT**: Authentication
- **CSS/SCSS**: Styling

---

## Folder Structure
```plaintext
.
├── backend/                  # Backend files (Node.js + Express.js)
│   ├── config/               # Configuration files (e.g., DB, JWT)
│   ├── controllers/          # Logic for API endpoints
│   ├── models/               # Database models (e.g., Student, Dormitory)
│   ├── routes/               # API routes
│   └── server.js             # Entry point for the backend server
├── client/                   # Frontend files (React.js)
│   ├── public/               # Public assets
│   ├── src/                  # Source code
│   │   ├── components/       # React components
│   │   ├── pages/            # Application pages
│   │   ├── styles/           # CSS/SCSS files
│   │   └── App.js            # Main React component
│   └── package.json          # Frontend dependencies
├── .gitignore                # Files to ignore in the repository
├── LICENSE                   # License information
├── README.md                 # Documentation
```

---

## Setup Instructions

### Prerequisites
- Node.js installed on your system
- MongoDB installed or access to a cloud-based MongoDB instance
- A code editor like Visual Studio Code

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/21mebrat/dormitory-student-management-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd dormitory-student-management-system
   ```

#### Backend Setup
3. Navigate to the backend directory:
   ```bash
   cd backend
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Configure the database:
   - Update the database URI in the `config` folder.
6. Start the backend server:
   ```bash
   npm start
   ```

#### Frontend Setup
7. Navigate to the client directory:
   ```bash
   cd client
   ```
8. Install dependencies:
   ```bash
   npm install
   ```
9. Start the frontend application:
   ```bash
   npm run dev
   ```

---

## Usage
1. Access the application in your browser at:
   ```plaintext
   http://localhost:5173
   ```
2. Log in as an admin or student to access respective features.
3. Use the dashboard to manage dormitory-related tasks.

---

## Contributing
Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For any inquiries or feedback, contact:

**Mebrat Matebie**  
**Email**: maytotmat@gmail.com  
**GitHub**: [21mebrat](https://github.com/21mebrat)
```


