import React from 'react';
import SideBar from '../sideBar/SideBar';
import Header from '../../../components/header/Header';
import './dashboardLayout.css';
import { FaUsers, FaUserShield, FaHome, FaBook, FaCogs } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
const DashboardLayout = () => {
  const auth = useSelector(state => state.auth)
  const links = [
    { path: '/director-dashboard', icon: FaHome },
    { path: '/director-dashboard/manage-students', icon: FaUsers },
    { path: '/director-dashboard/manage-buildings', icon: FaBook },
    { path: `/director-dashboard/update-DIRECTOR?userName=${auth?.userName}`, icon: FaCogs },
  ];
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

export default DashboardLayout;
