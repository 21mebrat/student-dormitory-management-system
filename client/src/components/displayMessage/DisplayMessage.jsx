import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import './DisplayMessage.css'; // Import the CSS file
import { FaTrash } from 'react-icons/fa'
import { useDeleteMessageMutation } from '../../redux/feature/student/studentApi';
import useSwal from '../../hooks/useSWal';
const DisplayMessage = ({ messageLists }) => {
    const {showErrorAlert,showSuccessAlert} = useSwal()
    const [deleteMessage, { isLoading }] = useDeleteMessageMutation()
    const sortedMessages = [...messageLists].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const handleDelete = async (id) => {
        const response = await deleteMessage(id)
        console.log(response)
        if (!response?.data) return showErrorAlert('Something go wrong tray again.')
            showSuccessAlert()
    }
    return (
        <div className="message-container">
            {sortedMessages.length > 0 ? (
                sortedMessages.map((message, index) => (
                    <div className="message-card" key={index}>
                        <h3 className="message-header">
                            From: <span>{message?.fullName}</span>, Student ID: <span>{message?.studentId}</span>
                        </h3>
                        <a className="message-email" href={`mailto:${message?.email}`}>
                            {message?.email}
                        </a>
                        <p className="message-body">{message?.message}</p>
                        <div className='flex justify-between items-center'>
                            <p style={{ fontStyle: 'italic', color: 'gray' }}>
                                {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                            </p>
                            <FaTrash onClick={() => handleDelete(message._id)} className='text-red-700 hover:text-red-400 cursor-pointer' />
                        </div>

                    </div>
                ))
            ) : (
                <p className="no-message">No message now</p>
            )}
        </div>
    );
};

export default DisplayMessage;
