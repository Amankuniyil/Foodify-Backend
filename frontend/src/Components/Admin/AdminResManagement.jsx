import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import Loading from '../Layout/Loading';
import Sidebar from '../Layout/AdminSideBar';
import { Link, useNavigate } from 'react-router-dom';

function AdminResManagement() {
  const [restaurantProfiles, setRestaurantProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfiles, setUserProfiles] = useState([]);

  const [acceptedRestaurant, setAcceptedRestaurant] = useState([]);


  const [blockAction, setBlockAction] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('http://127.0.0.1:8000/restaurant/restaurant-profiles/');
        setRestaurantProfiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant profiles:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);






  const handleAcceptRestaurant = (restaurantId) => {
    const endpoint = `http://127.0.0.1:8000/admin/register-restaurant/${restaurantId}/`;
  
    api
      .post(endpoint)
      .then((response) => {
        console.log('Restaurant registration response:', response);
  
        setAcceptedRestaurant((prevAcceptedRestaurant) => [
          ...prevAcceptedRestaurant,
          restaurantId,
        ]);
      })
      .catch((error) => {
        console.error('Error registering restaurant:', error);
      });
  };
  
  

  


  

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-grow ml-4">
        {loading ? (
          <Loading />
        ) : (
          <div className="px-6 pt-6 2xl:container mx-auto max-w-[your-width] overflow-x-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-black dark:bg-black dark:text-white">
                  <tr>
                    <th className="px-3 py-2 md:px-6 md:py-4">Restaurant</th>
             
                    <th className="px-3 py-2 md:px-6 md:py-4">City</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Year of Experience</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Registration</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">about</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Registered</th>
                    {/* ... Add more header columns if needed ... */}
                  </tr>
                </thead>
                <tbody>
                  {restaurantProfiles.map((profile) => (
                    <tr key={profile.id} className="bg-white border-b font-semibold text-black">
                      <td className="px-3 py-2 md:px-6 md:py-4 ">
                        {profile.restaurant}
                      </td>
                     
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.city}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.year_of_experience}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.registration_number}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.about}
                      </td>
                      <td><td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.is_registered ? (
                          <p className="text-green-500">Accepted</p>
                        ) : (
                          <button
                            onClick={() => handleAcceptRestaurant(profile.id)}
                            className={`font-medium ${
                              acceptedRestaurant.includes(profile.id)
                                ? "text-green-500"
                                : "text-blue-600 dark:text-blue-500 hover:underline"
                            } md:ml-2`}
                            disabled={acceptedRestaurant.includes(profile.id)}
                          >
                            {acceptedRestaurant.includes(profile.id)
                              ? "Accepted"
                              : "Accept"}
                          </button>
                        )}
                      </td></td>
                      {/* <td><Link to={`/admin/restaurant-profile/${profile.id}`}>
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
      profile
      
      </button>
      </Link></td><td><Link to={`/admin/restaurant/${profile.id}`} className="font-medium text-green-600 dark:text-green-500 hover:underline md:ml-2">
                        Show Details
                      </Link></td> */}
                      
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



export default AdminResManagement;
