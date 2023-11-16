import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../Auth/Logout';

function NavbarRes() {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useSelector(state => state.user);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const shouldShowSellerButton = !user || user.user_type === 'User';
    const location = useLocation();


        return (
            <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
              <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start">
                    <button
                      id="toggleSidebarMobile"
                      aria-expanded="true"
                      aria-controls="sidebar"
                      className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                    >
                      {/* Hamburger and Close icons */}
                    </button>
                    <a href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
                      <img
                        src="https://demo.themesberg.com/windster/images/logo.svg"
                        className="h-6 mr-2"
                        alt="Windster Logo"
                      />
                      <span className="self-center whitespace-nowrap">foodify</span>
                    </a>
                    <form
                      action="#"
                      method="GET"
                      className="hidden lg:block lg:pl-32"
                    >
                      {/* Search form */}
                    </form>
                  </div>
                  <div className="flex items-center">
                    <button
                      id="toggleSidebarMobileSearch"
                      type="button"
                      className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
                    >
                      {/* Search icon */}
                    </button>
                    <div className="hidden lg:flex items-center">
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          );
    
}

export default NavbarRes;
