import React, { useEffect, useState } from 'react';
import Navbar from '../Layout/NavbarRes';
import { Link, useParams, useHistory } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../Layout/Loading';
import 'react-toastify/dist/ReactToastify.css';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react";

function Menu() {
  const [foodList, setFoodList] = useState([]);
  const user = useSelector((state) => state.user);
  const { profileId } = useParams();

  const id = parseInt(profileId, 10);


  const [isLoading, setIsLoading] = useState(false);




  const handleDelete = async (foodItemId) => {
    try {
      // Make an API request to delete the food item
      await api.delete(`menu/delete-food/${foodItemId}`);
      // Remove the deleted item from the local state
      setFoodList(foodList.filter(item => item.id !== foodItemId));
      toast.success('Food item deleted successfully');
    } catch (error) {
      console.error('Error deleting food item', error);
      toast.error('Failed to delete food item');
    }
  };

  






  useEffect(() => {
    async function fetchFoodData() {
      try {
        const response = await api.get('menu/get-food/');
        setFoodList(response.data);
      } catch (error) {
        console.error('Error fetching food items', error);
      }
    }

    fetchFoodData();
  }, [profileId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('restaurant/restaurant-profiles/');
  
        
        setRestaurantProfiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant profiles:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  const handleToggleAvailability = async (foodItemId) => {
    try {
      const response = await api.post(`menu/toggle-availability/${foodItemId}/`);
      // You may want to update the local state to reflect the change in availability
  
      if (response.status === 200) {
        // Assuming the response includes updated food item information, you can update the local state here
        const updatedFoodList = foodList.map((foodItem) => {
          if (foodItem.id === foodItemId) {
            // Toggle the availability based on the response from the server
            return {
              ...foodItem,
              is_available: !foodItem.is_available,
            };
          }
          return foodItem;
        });
  
        setFoodList(updatedFoodList);
      }
    } catch (error) {
      console.error('Error toggling availability', error);
      toast.error('Failed to toggle availability');
    }
  };

  const [restaurantProfiles, setRestaurantProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderFoodCard = (foodItem) => (
    <div key={foodItem.id} className="bg-white rounded-lg overflow-hidden shadow-md">
      {/* ...rest of your code for rendering the food card */}
      <button onClick={() => handleDelete(foodItem.id)} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700">
        Delete
      </button>
    </div>
  );







  return (
    
    <div>
      
      {/* <NavbarRes /> */}
      <br /><br /><br />
        
      
       
      <h2 className="text-3xl font-bold mb-4">Restaurant</h2>
      <div className="flex-grow ml-4">
      {loading ? (
  <Loading />
) : (
  <div className="px-6 pt-6 2xl:container mx-auto max-w-[your-width] flex flex-wrap gap-4">
    {restaurantProfiles.map((profile) => {
      if (profile.is_registered && profile.restaurant === id) {
        return (
          <div
            key={profile.id}
            className="w-1/4 bg-white p-4 shadow-md rounded-lg"
          >
            {profile.restaurant_name}
            {profileId}
            {profile.restaurant}
          </div>
        );
      }
      return null;
    })}
  </div>
)}

</div>
      
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {foodList.map((foodItem) => (
          <div key={foodItem.id}>
            {/* <p>{foodItem.name}</p>
            <p>{foodItem.price}</p>
            <p>{foodItem.restaurant}</p>
            <p>{foodItem.description}</p>
            {renderFoodCard(foodItem)} */}
            <Card className="mt-6 w-96">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src={process.env.REACT_APP_API_BASE_URL + foodItem.image}
                  alt="card-image"
                />
              </CardHeader>
              <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{foodItem.name}</span>
                <span>₹ {foodItem.price}</span>
              </Typography>
                <Typography>
                {foodItem.description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>{renderFoodCard(foodItem)}</Button>
                {/* <Button
  onClick={() => handleToggleAvailability(foodItem.id)}
  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
>
  Toggle Availability
</Button> */}
              </CardFooter>


     
            </Card>
          </div>
   
        ))}
      </div>
      <div className="flex-grow ml-4">
      {loading ? (
  <Loading />
) : (
  <div className="px-6 pt-6 2xl:container mx-auto max-w-[your-width] flex flex-wrap gap-4">
    {restaurantProfiles.map((profile) => {
      if (profile.is_registered && profile.restaurant === id) {
        return (
          <div
            key={profile.id}
            className="w-1/4 bg-white p-4 shadow-md rounded-lg"
          >
            {profile.restaurant_name}
            {profileId}
            {profile.restaurant}
          </div>
        );
      }
      return null;
    })}
  </div>
)}

</div>
    </div>
  );
}

export default Menu;
