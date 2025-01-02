import React from "react";
import { useBackupUsersQuery, useCreateBackupMutation, useRestoreDbMutation } from "../../../redux/feature/auth/authApi";
import useSwal from "../../../hooks/useSWal";
import axios from 'axios'
const BackupComponent = () => {
    const [createbackup] = useCreateBackupMutation()
    const [restoreDb, { isError: isErrorR, error: restoreError }] = useRestoreDbMutation()
    // Use the query hook to get backup users data
    const { data: backupUsers, isLoading, isError, error } = useBackupUsersQuery();
    const { showErrorAlert, showSuccessAlert } = useSwal()
    // Export Orders as JSON (we'll simulate the export action)
    const handleExport = async () => {
        try {
            if (backupUsers) {
                // Simulate exporting data
                const jsonData = JSON.stringify(backupUsers);  // Convert the backupUsers data to JSON
                const blob = new Blob([jsonData], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "users_backup.json");
                document.body.appendChild(link);
                link.click();
                if (isError) {
                    return showErrorAlert(error?.message)
                }

            } else {
                return showErrorAlert('No Data Found')

            }
        } catch (error) {
            showErrorAlert('Internal server Error')

        }
    };

    // Create Backup on Server
    const handleBackup = async () => {
        try {
            await createbackup({})
            if (isErrorR) {
                return showErrorAlert(restoreError?.message)
            }
            showSuccessAlert()

        } catch (error) {
            showErrorAlert("Bakup Failed! TrayAgain.")

        }
    };

    // Restore Backup
    const handleRestore = async () => {
        try {
            await restoreDb()
            if (isErrorR) {
                return showErrorAlert(restoreError?.message)
            }
            showSuccessAlert()

        } catch (error) {
            showErrorAlert("Restore Failed! TrayAgain.")

        }
    };

    // Handle error or loading states
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error fetching backup users: {error?.message}</p>;
    }

    return (
        <div style={{ padding: "20px", background: "#fff", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h2>Admin Backup Component</h2>
            {isLoading && <p>Loading...</p>}
            {isError && <p>{error.message}</p>}

            <button onClick={handleExport} style={buttonStyle}>
                Export Users
            </button>
            <button onClick={handleBackup} style={buttonStyle}>
                Create Backup
            </button>
            <button onClick={handleRestore} style={buttonStyle}>
                Restore Backup
            </button>
        </div>
    );
};

const buttonStyle = {
    margin: "10px",
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    maxWidth: '300px'
};

export default BackupComponent;
