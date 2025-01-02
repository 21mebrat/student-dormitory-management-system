import React, { useEffect, useState } from "react";
import '../manageStudents/director.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import useSwal from "../../../hooks/useSWal";
import { useDeleteBuildingMutation, useGetAllBuildingsQuery } from "../../../redux/feature/Director/directorApp";
import { useSelector } from "react-redux";
import Title from "../../../components/title/Title";

const ManageBuildings = () => {
  const [file, setFile] = useState('');
  const { showErrorAlert, showSuccessAlert } = useSwal();
  const searchedStudent = useSelector(state => state.searchedStudent.searchedStudent)
  const [filteredStudents, setFilteredStudents] = useState([]); // New state for filtered results
  const { data: buildings, isLoading, isError, error } = useGetAllBuildingsQuery();
  const [deleteBuilding, { isError: isDError, error: deleteError }] = useDeleteBuildingMutation()

  // Ensure buildings is an array before trying to access length or map
  const buildingList = Array.isArray(buildings) ? buildings : [];
  //sorting

useEffect(() => {
  if (searchedStudent) {
    const filtered = searchedStudent ? buildingList?.filter(building =>
      building?.buildingNumber?.toLowerCase().includes(searchedStudent?.toLowerCase())
    )
      : buildingList;
    setFilteredStudents(filtered);
  } else {
    setFilteredStudents(buildingList);
  }
}, [searchedStudent, buildingList]);

  const handleDelete = async (id) => {
    try {
      // Call the deleteBuilding mutation
      await deleteBuilding(id).unwrap();

      // Check if the response indicates success
      if (!isDError) {
        showSuccessAlert("Building deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting building:", error);
      showErrorAlert(
        error?.response?.data?.message || "Failed to delete the building. Try again."
      );
    }
  };


  axios.defaults.withCredentials = true;
const navigate = useNavigate()
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        console.log("Uploading file...");
        const response = await axios.post("http://localhost:8000/api/building/insert", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data) {
          showSuccessAlert("File uploaded successfully!");
          console.log("Upload successful:", response.data);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        showErrorAlert(
          error.response?.data?.message || "File upload failed! Try again."
        );
      }
    } else {
      console.log("File is empty");
      showErrorAlert("No file selected. Please choose a file to upload.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error occurred while loading the buildings</p>;


  return (
    <div>
      <Title title='Manage Buildings' />
      <div className="add-buttons flex flex-col md:flex-row justify-center items-center gap-4 mx-8">
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
        onClick={()=>navigate('/director-dashboard/register-building')}
         className=" w-32"
         >Add manully</button>

      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Building Name</th>
            <th>Building Location</th>
            <th>Rooms</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ?
            filteredStudents.map((building, index) => (
              <tr key={building._id}>
                <td>{index + 1}</td>
                <td>{building.buildingNumber}</td>
                <td>{building.location}</td>
                <td>{building.rooms.length}</td>
                <td>
                  <Link to={`/director-dashboard/update-building/${building._id}`} className='underline hover:text-blue-600'>Edit</Link>
                </td>
                <td>
                  <div onClick={() => handleDelete(building._id)}>
                    <FaTrash size={20} className="text-red-600 hover:text-red-300" />
                  </div>
                </td>
              </tr>
            ))
            :
            <p>No buildings found</p>
          }
        </tbody>
      </table>
    </div>
  );
};

export default ManageBuildings;
