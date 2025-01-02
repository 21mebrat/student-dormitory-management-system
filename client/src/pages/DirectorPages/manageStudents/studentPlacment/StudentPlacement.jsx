import React, { useEffect, useState } from "react";
import './director.css';
import { Link } from "react-router-dom";
import { useAddStudentMutation, useGetAllStudentsQuery } from "../../../redux/feature/Director/directorApp";
import { FaTrash } from 'react-icons/fa'
import useSwal from "../../../hooks/useSWal";
import axios from "axios";
import { useSelector } from "react-redux";

const ManageStudents = () => {
  const [file, setFile] = useState();
  const {data:students,isloading,isError,error} = useGetAllStudentsQuery()
  const searchedStudent = useSelector(state => state.searchedStudent.searchedStudent)
  const { showSuccessAlert, showErrorAlert } = useSwal();

  const [filteredStudents, setFilteredStudents] = useState(students); // New state for filtered results

  useEffect(() => {
    if (searchedStudent) {
      const filtered = students.filter(student =>
        student?.firstName?.toLowerCase().includes(searchedStudent?.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [searchedStudent, students]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        console.log("Uploading file...");
        const response = await axios.post("http://localhost:8000/api/student/insert", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data) {
          setStudents(response.data.students); // Update the state with the new students
          showSuccessAlert("File uploaded successfully!");
          console.log("Upload successful:", response.data);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        showErrorAlert(
          error.response?.data?.message || "Registration Failed! Try Again."
        );
      }
    } else {
      console.log("File is empty");
      showErrorAlert("No file selected. Please choose a file to upload.");
    }
  };

  const handlePlacement = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/student/placement");
      if (response.data) {
        setStudents(response.data.students);
        console.log(response)
        showSuccessAlert(response.data.message);
      }
    } catch (error) {
      console.error("Error making placement:", error);
      showErrorAlert(
        error.response?.data?.message || "An error occurred during placement."
      );
    }
  };

  return (
    <div>
      <h2>Manage Students</h2>
      <div className="add-buttons flex flex-col md:flex-row items-center gap-4">
        <form className="flex flex-col gap-2 md:flex-row items-center space-x-4" onSubmit={handleFileUpload}>
          <input
            type="file"
            name="file"
            className="py-2 px-4 border border-gray-500 rounded-lg max-w-[15rem] shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type="submit"
            className="upload-label bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Upload
          </button>
        </form>
        <button
          type="button"
          className="placement-button bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          onClick={handlePlacement}
        >
          Make Placement
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>firestName</th>
            <th>lastName</th>
            <th>building</th>
            <th>Room</th>
            <th colSpan={2} style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents?.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student?.firstName}</td>
              <td>{student?.lastName}</td>
              <td>{student?.room}</td>
              <td>{student?.room}</td>
              <td>
                <Link className="hover:underline hover:text-blue-500">Edit</Link>
              </td>
              <td>
                <div onClick={() => handleDelete(student.id)}>
                  <FaTrash size={20} className="text-red-500 cursor-pointer hover:text-red-700" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;
