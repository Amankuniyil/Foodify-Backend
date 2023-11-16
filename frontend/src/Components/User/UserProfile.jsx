import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api/axiosConfig'
import UserEditProfileModal from './UserEditProfileModal';
import Navbar from '../Layout/Navbar';
import Address from '../User/Address';
// import RequestedPropertyDetails from './RequestedPropertyDetails';

import { Link } from 'react-router-dom';
// import { Button } from 'flowbite-react';



function UserProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const authToken = useSelector((state) => state.accessToken);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    
    api
      .get("http://127.0.0.1:8000/users/user-profile/")
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
    }, []);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const updateProfileDataInParent = (newProfileData) => {
      setProfileData(newProfileData);
    };

    
  return (
    <div>
      <Navbar/>
      <div className="h-full p-8">
      
      {profileData && (
       <>
      <div className="flex items-center justify-center">
      
       <h1>Welcome!..</h1>
       </div>
 

        
        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
              <ul className="mt-2 text-gray-700">
                <li className="flex border-y py-2">
                  <span className="font-bold w-24">Full name:</span>
                  <span className="text-gray-700">{user.first_name} {user.last_name}</span>
                </li>
                
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Mobile:</span>
                  <span className="text-gray-700">{user.phone_number}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Email:</span>
                  <span className="text-gray-700">{user.email}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">State:</span>
                  <span className="text-gray-700">{profileData.state}</span>
                </li>
                {/* <Link to={`/userorder/${user.id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 mt-4">
          Orders
        </button>
      </Link> */}
                
              </ul>
            </div><p>
            <Link to="/userorder">
        <button className="bg-yellow-400 text-white px-4 py-2 mt-5">
         Orders
        </button>
      </Link>
      <Link to="/address">
        <button className="bg-blue-400 text-white px-4 py-2 mt-5">
          Adress
        </button>
      </Link>
      </p>
      
      <Address />
            
          

          </div>
        </div>
        

       
        </>
        )}
      </div>
      <UserEditProfileModal isOpen={isModalOpen} closeModal={closeModal} updateProfileData={updateProfileDataInParent}/>


    </div>
    
  )
}

export default UserProfile