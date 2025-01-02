import React from 'react';
import Header from '../../../components/header/Header';
import { FaUsers, FaUserShield, FaHome, FaBook, FaCogs } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import SideBar from '../../DirectorPages/sideBar/SideBar';
const links = [
    { path: '/dashboard', icon: FaHome },
    { path: '/director-dashboard', icon: FaUsers },
    { path: '/director-dashboard/manage-proctors', icon: FaUserShield },
    { path: '/director-dashboard/manage-buildings', icon: FaBook },
    { path: '/director-dashboard/settings', icon: FaCogs },
];
const ProctorLayout = () => {
    return (
        <div className='dashboard-layout'>
            <SideBar links={links} />
            <div className='dashboard-main'>
                <Header />
                <div className='content'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ProctorLayout;
