import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Search from '../../search/Search'
import logo from '../../../assets/logo.jfif'
import './navbar.css'
import { FiMenu, FiX } from 'react-icons/fi'; // Import icons
const NavBar = () => {
    const [isOpened, setIsOpened] = useState(false)
    return (
        <header className='student-header'>
            <img className='student-header-logo' src={logo} alt="logo" />
            <Search />
            <nav className='student-header-navbar'>

                <ul>
                    <li className='student-header-navbar-link' >
                        <Link to='/student'>Home</Link>
                    </li>
                    <li className='student-header-navbar-link'>
                        <Link to='/student/search-dorm'>SearchDorm</Link>
                    </li>
                    <li className='student-header-navbar-link'>
                        <Link to='/student/contact'>Contact</Link>
                    </li>
                    <li className='student-header-navbar-link'>
                        <Link to='/student/about'>About</Link>
                    </li>
                </ul>
            </nav>
            <div className="mobile-navbar">
                <button type="button" onClick={()=>setIsOpened(!isOpened)}>
                    <FiMenu />
                </button>
                {
                    isOpened &&
                    <ul className="mobile-navbar-link">
                        <li onClick={()=>setIsOpened(!isOpened)} className='student-header-navbar-link' >
                            <Link to='/student'>Home</Link>
                        </li>
                        <li onClick={()=>setIsOpened(!isOpened)} className='student-header-navbar-link'>
                            <Link to='/student/search-dorm'>SearchDorm</Link>
                        </li>
                        <li onClick={()=>setIsOpened(!isOpened)} className='student-header-navbar-link'>
                            <Link to='/student/contact'>Contact</Link>
                        </li>
                        <li onClick={()=>setIsOpened(!isOpened)} className='student-header-navbar-link'>
                            <Link to='/student/about'>About</Link>
                        </li>
                    </ul>

                }
            </div>
        </header>
    )
}

export default NavBar
