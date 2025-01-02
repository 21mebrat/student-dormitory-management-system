import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Sidebar.css';

const SideBar = ({ links }) => {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (index) => {
        setOpenMenu(openMenu === index ? null : index);
    };

    return (
        <div className="sidebar">
            {links.map((link, index) => (
                <div key={index} className="sidebar-item">
                    {link.submenus ? (
                        <>
                            <div
                                className="sidebar-link"
                                onClick={() => toggleMenu(index)}
                            >
                                <link.icon className="sidebar-icon" />
                                <span className="sidebar-title">{link.title}</span>
                                {openMenu === index ? (
                                    <FaChevronUp className="dropdown-icon" />
                                ) : (
                                    <FaChevronDown className="dropdown-icon" />
                                )}
                            </div>

                            {/* Submenu items */}
                            {openMenu === index && (
                                <div className="submenu">
                                    {link.submenus.map((submenu, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            to={submenu.path}
                                            className="submenu-link"
                                        >
                                            <submenu.icon className="submenu-icon" />
                                            <span>{submenu.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <Link to={link.path} className="sidebar-link">
                            <link.icon className="sidebar-icon" />
                            <span className="sidebar-title">{link.title}</span>
                        </Link>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SideBar;
