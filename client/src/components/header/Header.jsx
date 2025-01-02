import React, { useRef, useState } from 'react';
import './header.css';
import Title from '../title/Title';
import { FaSignOutAlt } from 'react-icons/fa';
import Search from '../search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../../redux/store';
import { logut } from '../../redux/feature/auth/authSlice';
import { getImag } from '../../utils/getImageSrc';
import mg from '../../assets/profile.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../redux/feature/auth/authApi';
import useSwal from '../../hooks/useSWal';
const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const profileRef = useRef()
  
    const { showErrorAlert, showSuccessAlert } = useSwal()
    const [isOpened, setIsOpened] = useState(false)
    const auth = useSelector(state => state.auth)
    const [logoutUser, { isLoading }] = useLogoutUserMutation()
    const handleLogout = async () => {
        try {
            const response = await logoutUser().unwrap()
            console.log(response,'logout')
            if (!response?.message) return showErrorAlert('Sorry Please try again')
            showSuccessAlert(response?.message || 'successfully logout')
        } catch (error) {
            console.log(error)
          return  showErrorAlert('Something go to wrong tray again')
        }
        dispatch(logut());
        // Purge the persisted state (clear localStorage)
        persistor.purge();
    };
    return (
        <div className='dashboard-header'>
            <div className="title hidden md:flex">
                <Title title="DMU DMS" />
            </div>
            <div className="header-right-side">
                <div className="profile">
                    <Search />
                    <button onClick={() => navigate(auth?.role === 'DIRECTOR' && '/director-dashboard/messages')} className="relative max-w-10 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                        <span className="sr-only">Notifications</span>
                        <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
                        <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                    <div className="profile-container">
                        <img className='profile-image' onClick={() => setIsOpened(!isOpened)} src={getImag(auth?.file)} alt={auth?.file} />
                        {
                            isOpened && (
                                <div ref={profileRef} className="profile-manage-container">
                                    <div className="profile-manage-image">
                                        <p>{auth?.userName}</p>
                                        <img className='profile-image' src={getImag(auth?.file)} alt={auth?.file} />
                                    </div>
                                    <h3 className='mt-5'>{auth?.userName}</h3>
                                    <p className='role'>{auth?.role}</p>
                                    <ul>
                                        <li>
                                            <Link
                                             to={ auth?.role === 'DIRECTOR' ? `/director-dashboard/update-DIRECTOR?userName=${auth?.userName}`: `/admin-dashboard/update-ADMIN?userName=${auth?.userName}`}
                                             onClick={()=>setIsOpened(false)}
                                            >update Account</Link>
                                        </li>

                                        <li>
                                            <div onClick={handleLogout} className="logout mr-10">
                                               {isLoading ? 'logout...': <FaSignOutAlt />}  
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Header;
