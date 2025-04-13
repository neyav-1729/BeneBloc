import React from "react";

const DemoSidebar = () => {
  return (
    <div className="w-48 bg-gray-800 text-white h-screen flex flex-col p-4"> {/* Reduced width */}
      {/* Sidebar Header */}
      <div className="text-center mb-6">
        {/* <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="mt-2 text-sm">User Info & Stats</p> */}
      </div>

      {/* Sidebar Menu */}
      <div className="flex-1">
        <ul className="space-y-4">
          {/* Profile */}
          <li className="flex items-center text-lg text-white hover:bg-gray-700 p-2 rounded-md transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v12h14V3H5z"
              />
            </svg>
            Profile
          </li>

          {/* Wallet */}
          <li className="flex items-center text-lg text-white hover:bg-gray-700 p-2 rounded-md transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1z"
              />
            </svg>
            Wallet
          </li>

          {/* Community */}
          <li className="flex items-center text-lg text-white hover:bg-gray-700 p-2 rounded-md transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 9V3H7v6m0 8v6h10v-6M5 3h14"
              />
            </svg>
            Community
          </li>

          {/* Notifications */}
          <li className="flex items-center text-lg text-white hover:bg-gray-700 p-2 rounded-md transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 22c1.104 0 2-.896 2-2H10c0 1.104.896 2 2 2zm6-6V9c0-3.314-2.686-6-6-6V2a1 1 0 00-1-1 1 1 0 00-1 1v1c-3.314 0-6 2.686-6 6v7l-2 2v1h16v-1l-2-2z"
              />
            </svg>
            Notifications
          </li>

          {/* Settings */}
          <li className="flex items-center text-lg text-white hover:bg-gray-700 p-2 rounded-md transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11l-7 7-7-7M5 13h14"
              />
            </svg>
            Settings
          </li>
        </ul>
      </div>

      {/* Removed Footer */}
    </div>
  );
};

export default DemoSidebar;
