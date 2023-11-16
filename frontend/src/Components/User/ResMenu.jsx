import React, { useEffect, useState } from 'react';
import Navbar from '../Layout/Navbar';
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

function ResMenu() {
  const [foodList, setFoodList] = useState([]);
  const user = useSelector((state) => state.user);
  const { profileId } = useParams();

  const id = parseInt(profileId, 10);


  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (foodId) => {
    setIsLoading(true);

    try {
      console.log('Sending request to add item to cart...');
      const response = await api.post(`http://127.0.0.1:8000/cart/add/${foodId}/`);
      const { message, cart_item_id } = response.data;
      console.log('Item added to cart successfully!');
      console.log(`Cart Item ID: ${cart_item_id}`);
      toast.success(message);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart.");
    } finally {
      setIsLoading(false);
    }
};



  useEffect(() => {
    async function fetchFoodData() {
      try {
        const response = await api.get(`menu/get-food/${profileId}`);
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

  const [restaurantProfiles, setRestaurantProfiles] = useState([]);
  const [loading, setLoading] = useState(true);





  const renderFoodCard = (foodItem) => (
    <div key={foodItem.id} className="bg-white rounded-lg overflow-hidden shadow-md">
      {/* ...rest of your code for rendering the food card */}
      <button onClick={() => handleAddToCart(foodItem.id)} className="bg-black text-white px-4 py-2 mt-2 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );

  return (
    
    <div>
      
      <Navbar />
      <br /><br /><br />
        
      
       
      <h2 className="text-3xl font-bold mb-4 text-center mx-auto">Restaurant</h2>

      <div className="flex-grow ml-4">
      {loading ? (
  <Loading />
) : (
  <div className="px-6 pt-6 2xl:container mx-auto max-w-[your-width] flex flex-wrap gap-4">
    {restaurantProfiles.map((profile) => {
      if (profile.is_registered && profile.restaurant === id) {
        return (
          <div key={profile.id} className="">
  <h2 className="text-3xl font-bold mb-2">{profile.restaurant_name}</h2>
  <h2 className="text-xl font-semibold text-gray-700 mb-2">{profile.about}</h2>
  <h2 className="text-lg text-gray-500">{profile.address}</h2>
</div>

        );
      }
      return null;
    })}
  </div>
)}

</div>
<h2 className="text-2xl font-bold mb-4 text-center mx-auto">Menu</h2>

      
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {foodList.map((foodItem) => (
          <div key={foodItem.id}>
        
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
            
                <button className='bg-gray-300'>{renderFoodCard(foodItem)}</button>
                
            </Card>
          </div>
   
        ))}
      </div>

    </div>
  );
}

export default ResMenu;
