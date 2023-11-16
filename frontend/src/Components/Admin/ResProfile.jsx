import React from 'react';
import { useParams } from 'react-router-dom';


function RestaurantDetailsPage() {
  // Use useParams to get the restaurant ID from the URL
  const { restaurantId } = useParams();

  // You can fetch restaurant details using the restaurantId if needed

  return (
    <div>
      <h2>Restaurant Details</h2>
      <p></p>
      {/* Display restaurant details here */}
    </div>
  );
}

export default RestaurantDetailsPage;
