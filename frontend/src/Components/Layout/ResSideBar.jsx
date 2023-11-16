import React from 'react';

const ResSideBar = () => {
  return (
    <aside
      id="sidebar"
      className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
      aria-label="Sidebar"
    >
      <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 bg-white divide-y space-y-1">
            <ul className="space-y-2 pb-2">
              <li>
                <form action="#" method="GET" className="lg:hidden">
                  {/* Mobile search form */}
                </form>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                >
                  {/* Dashboard icon and text */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  {/* Add Food icon and text */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  {/* Inbox icon and text */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  {/* Users icon and text */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-900 font-normal rounded-lg hover-bg-gray-100 flex items-center p-2 group"
                >
                  {/* Products icon and text */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-900 font-normal rounded-lg hover-bg-gray-100 flex items-center p-2 group"
                >
                  {/* Sign In icon and text */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-900 font-normal rounded-lg hover-bg-gray-100 flex items-center p-2 group"
                >
                  {/* Sign Up icon and text */}
                </a>
              </li>
            </ul>
            <div className="space-y-2 pt-2">
              <a
                href="#"
                className="text-base text-gray-900 font-normal rounded-lg hover-bg-gray-100 group transition duration-75 flex items-center p-2"
              >
                {/* Upgrade to Pro icon and text */}
              </a>
              <a
                href="#"
                target="_blank"
                className="text-base text-gray-900 font-normal rounded-lg hover-bg-gray-100 group transition duration-75 flex items-center p-2"
              >
                {/* Documentation icon and text */}
              </a>
              <a
                href="#"
                target="_blank"
                className="text-base text-gray-900 font-normal rounded-lg hover-bg-gray-100 group transition duration-75 flex items-center p-2"
              >
                {/* Components icon and text */}
              </a>
              <a
                href="#"
                className="text-base text-gray-900 font-normal rounded-lg hover-bg-gray-100 group transition duration-75 flex items-center p-2"
              >
                {/* Help icon and text */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ResSideBar;
