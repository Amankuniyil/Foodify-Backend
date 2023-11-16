import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../Auth/Logout';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useSelector(state => state.user);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const shouldShowSellerButton = !user || user.user_type === 'User';
    const location = useLocation();

    return (
        <nav className="bg-gradient-to-r from-white to-white text-orange-500 shadow-lg" style={{ position: 'fixed', top: '0', width: '100%', zIndex: '1000' }}>
            <div className="md:flex items-center justify-between py-2 px-4 md:px-8 lg:px-12">
                <div className="flex justify-between items-center">
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                           
                        </button>
                    </div>
                    <div className="text-xl md:text-3xl">
                        <a href="/">
                            <span className="logo-letter font-bold text-orange-500">foodify</span>
 
                        </a>
                    </div>
                </div>
    
                <div className={`md:flex md:items-center ${menuOpen ? 'block' : 'hidden'}`}>
                    <div className="text-gray-800 py-2 md:py-0 md:space-x-2">
                        <NavLink to='/' className={`block md:inline font-bold text-orange-500 hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md `}>Home</NavLink>
                        {shouldShowSellerButton && (
                            <>
                                <NavLink to='/find-' className={`block md:inline font-bold text-orange-500 hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md `}>Find Restaurants</NavLink>
                                <NavLink to="/signup" className={`block md:inline font-bold text-orange-500 hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md `}>Become a Partner</NavLink>
                            </>
                        )}
                        <NavLink to='/cart' className={`block md:inline font-bold text-orange-500 hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md `}>Cart</NavLink>
                        {user ? (
                            <>
                                <div className="relative inline-block text-left">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <div>
                                            <p className={`block md:inline font-bold text-orange-500 hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md `}>Profile</p>
                                            {/* <lord-icon
                                                src="https://cdn.lordicon.com/hbvyhtse.json"
                                                trigger="hover"
                                                colors="primary:#ffffff"
                                                style={{ width: "50px", height: "30px", paddingTop: "7px" }}
                                            >
                                            </lord-icon> */}
                                        </div>
                                    </button>
                                    {dropdownOpen && (
                                        <div className={`origin-top-right absolute md:right-0 ${menuOpen ? 'mt-2' : 'mt-4'} w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="about-menu">
                                                <NavLink
                                                    to="/profile"
                                                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                >
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/jfhbogmw.json"
                                                        trigger="hover"
                                                        colors="primary:#0000"
                                                        style={{ width: "30px", height: "30px", paddingTop: "10px" }}
                                                    >
                                                    </lord-icon>
                                                    {user.username}
                                                </NavLink>
                                                <div>
                                                    {<Logout />}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={`block md:inline font-bold text-orange-500 hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md ${location.pathname === '/login' ? 'bg-black' : ''}`}>Login</NavLink>
                                <NavLink to="/signup" className={`block md:inline font-bold text-orange-500 hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md ${location.pathname === '/signup' ? 'bg-black' : ''}`}>Signup</NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
    
}

export default Navbar;
