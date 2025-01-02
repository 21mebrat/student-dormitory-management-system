import React from 'react';
import './adminLayout.css'
import SideBar from '../../DirectorPages/sideBar/SideBar';
import Header from '../../../components/header/Header';
import { Outlet } from 'react-router-dom';
import './systemAdmin.css'
import { FaUserPlus, FaUserEdit, FaUserMinus, FaDatabase, FaSyncAlt, FaUserCog, FaHome } from 'react-icons/fa';

const adminLinks = [
    {
        icon: FaHome,
        icon: FaUserCog,
        submenus: [
            { icon: FaUserPlus, path: '/admin-dashboard/create-account' },
            { icon: FaUserEdit, path: '/admin-dashboard/manage-accounts' },
            { icon: FaUserMinus, path: '/admin-dashboard/manage-accounts' },
        ],
    },
    { icon: FaDatabase, path: '/admin-dashboard/backup' },
    { icon: FaSyncAlt, path: '/admin-dashboard/backup' },
];


const AdminDashboardLayout = () => {
    return (
        <div className="system-admin-dashboard">
            <SideBar links={adminLinks} />
            <div className="system-admin-dashboard-right">
                <Header header='Admin Dashboard' />
                <div className='system-admin-content'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;
