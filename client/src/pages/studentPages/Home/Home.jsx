import React from 'react'
import NavBar from '../../../components/student/NavBar/NavBar'
import './home.css'
import { Outlet } from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Home
