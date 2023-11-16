import React, { useEffect, useState } from "react";
import api from '../../api/axiosConfig';
import { useSelector } from 'react-redux';


const Address = () => {
  const [addresses, setAddresses] = useState([]);
  
  const user = useSelector(state => state.user);
  const userId = user.user_id;
  const AddressList = ({ addresses }) => {
    return (
      <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
  <h4 className="text-xl text-gray-900 font-bold">Your Addresses</h4>
  {addresses.map((address, index) => (
    <div key={index}>
      <ul className="mt-2 text-gray-700">
        <li className="flex border-y py-2">
          <span className="font-bold w-24">Address Ln1: </span>
          <span className="text-gray-700">{address.address_line1}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Address Ln2: </span>
          <span className="text-gray-700">{address.address_line2}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">State:</span>
          <span className="text-gray-700">{address.state}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">City:</span>
          <span className="text-gray-700">{address.city}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Pincode:</span>
          <span className="text-gray-700">{address.pincode}</span>
        </li>
      </ul>
      <hr />
    </div>
  ))}
</div>

    );
  };

  useEffect(() => {
    // Fetch the user's addresses and update the 'addresses' state
    const fetchAddresses = async () => {
      try {
        const response = await api.get(`http://127.0.0.1:8000/orders/get-addresses/?user=${userId}`);
        if (response.status === 200) {
          setAddresses(response.data);
        }
      } catch (error) {
        // Handle error here
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [userId]);

  return (
    <div>
      <h1>Your Addresses</h1>
      <AddressList addresses={addresses} />
    </div>
  );
};

export default Address;
