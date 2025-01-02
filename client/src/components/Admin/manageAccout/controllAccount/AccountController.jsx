import React from "react";
import "./account.css";
import { Link } from "react-router-dom";
import { useDeleteUsersMutation, useGetAllUsersQuery } from "../../../../redux/feature/auth/authApi";
import useSwal from "../../../../hooks/useSWal";
import { useSelector } from "react-redux";

const AccountController = () => {
  const { showErrorAlert, showSuccessAlert } = useSwal()
  const searchedStudent = useSelector(state => state.searchedStudent.searchedStudent)
  const [deleteUsers, { data: DeletedUser, isSuccess, isError: isDeleteError, error: deleteError }] = useDeleteUsersMutation()
  const { data: accounts, isloding, isError, error, refetch } = useGetAllUsersQuery()
  const filtered = searchedStudent ? accounts?.filter(student =>
    student?.userName?.toLowerCase().includes(searchedStudent?.toLowerCase())
  )
    : accounts;
  const handleDelete = async (id) => {
    try {
      await deleteUsers({ id })
      if (isDeleteError) {
        return showErrorAlert(deleteError?.message)
      }
    
        showSuccessAlert()
     
      refetch()
    } catch (error) {
      console.log(error)
      showErrorAlert("Registeration Failed! TrayAgain.")
    }
  }
  if (isloding) return <P>loading...</P>
  if (isError) return <p>some Error Ocured</p>
  return (
    <div className="account-container">
      <h2>Account Management</h2>
      <table className="account-table">
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>status</th>

            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered && filtered.length > 0 ? (
            filtered.map((account, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{account.userName}</td>
                <td>{account.email}</td>
                <td>{account.password?.substring(0, 5)}...</td>
                <td>{account?.status}</td>

                <td>
                  <Link to={`/admin-dashboard/update-account/${account._id}`} className="btn btn-edit">Edit</Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(account._id)} className="btn btn-delete">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No accounts available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountController;
