import React, { useEffect, useState } from "react";
import './director.css';
import { Link, useNavigate } from "react-router-dom";
import { useAddStudentMutation, useDeleteStudentMutation, useGetAllStudentsQuery } from "../../../redux/feature/Director/directorApp";
import { FaTrash } from 'react-icons/fa'
import useSwal from "../../../hooks/useSWal";
import axios from "axios";
import { useSelector } from "react-redux";
import Title from "../../../components/title/Title";

const ManageStudents = () => {
  const [file, setFile] = useState();
  const { data: dbStudents, isloading, isError } = useGetAllStudentsQuery()
  const [deleteStudent, { isError: isDError,isSuccess, error: deleteError }] = useDeleteStudentMutation()
  const searchedStudent = useSelector(state => state.searchedStudent.searchedStudent)
  const { showSuccessAlert, showErrorAlert } = useSwal();
  const [students, setStudents] = useState([])
  const navigate = useNavigate()
  const [filteredStudents, setFilteredStudents] = useState(students); // New state for filtered results
  useEffect(() => {
    if (!isloading && dbStudents) {
      setStudents(dbStudents)
    }
  }, [dbStudents])
  useEffect(() => {
    if (searchedStudent) {
      const filtered = searchedStudent ? students?.filter(student =>
        student?.firstName?.toLowerCase().includes(searchedStudent?.toLowerCase())
      )
        : students;
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [searchedStudent, students]);

  axios.defaults.withCredentials = true;

  const handleDelete = async (id) => {
    try {
      const response = await deleteStudent(id).unwrap()
      if (response.success) {
        setStudents(students.filter((student) => student._id !== id));
        showSuccessAlert("File uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      showErrorAlert(
        error.response?.data?.message || "Registration Failed! Try Again."
      );
    }
  };

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
  if (isloading) return <p className='text-center'>loading...</p>
  if (isError) return <p className='text-center'>Error on fetching Student please refresh the page</p>
  return (
    <div>
      <Title title='Manage Students' />
      <div className="add-buttons flex flex-col md:flex-row items-center gap-4 justify-center mx-8">
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
        <button onClick={()=>navigate('/director-dashboard/register-student')}>
          Add Manually
        </button>
      </div>


      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>firestName</th>
            <th>lastName</th>
            <th>Student Id</th>
            <th>Assingned Room</th>
            <th colSpan={2} style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredStudents?.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student?.firstName}</td>
                <td>{student?.lastName}</td>
                <td>{student?._id}</td>
                <td>{student?.room}</td>
                <td>
                  <Link to={`/director-dashboard/update-student/${student?._id}`}  className="hover:underline hover:text-blue-500">Edit</Link>
                </td>
                <td>
                  <div onClick={() => handleDelete(student._id)}>
                    <FaTrash size={20} className="text-red-500 cursor-pointer hover:text-red-700" />
                  </div>
                </td>
              </tr>
            ))}

        </tbody>
      </table>
      {
        filteredStudents.length == 0 &&
        <p className="text-red-600 text-center text-2xl">No Student Found With Name: <span className="text-blue-600 capitalize mx-auto">{searchedStudent}</span></p>
      }
    </div>
  );
};

export default ManageStudents;
