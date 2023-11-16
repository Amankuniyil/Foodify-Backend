import React, { useState } from "react";
import api from '../../api/axiosConfig';
import { useSelector, useDispatch } from 'react-redux';

const AddAddress = () => {
  const [address, setAddress] = useState({
    address_line1: "",
    address_line2: "",
    state: "",
    city: "",
    pincode: "",
  });
  
  const user = useSelector(state => state.user);
  const userId = user.user_id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("http://127.0.0.1:8000/orders/add-address/", address);
      if (response.status === 201) {
        // Address added successfully
        alert("Address added successfully!");
        // Reset the form
        setAddress({
          address_line1: "",
          address_line2: "",
          state: "",
          city: "",
          pincode: "",
        });
      }
    } catch (error) {
      // Handle error here
      console.error("Error adding address:", error);
    }
  };

  return (
    <div>
      <h1>Add Address</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Address Line 1:</label>
          <input
            type="text"
            name="address_line1"
            value={address.address_line1}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address Line 2:</label>
          <input
            type="text"
            name="address_line2"
            value={address.address_line2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Address</button>
      </form>
    </div>
  );
};

export default AddAddress;
