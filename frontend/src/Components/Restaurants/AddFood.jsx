import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import NavbarRes from '../Layout/NavbarRes';
import ResSideBar from '../Layout/ResSideBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosConfig';

function AddFood() {
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.accessToken);

  // Define state to store form data
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    description: '',
    category: '',
    price: '',
    is_spicy: false,
    is_available: true,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    // Check if the input is a file input or a checkbox
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] }); // Store the file object
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked }); // Store the checkbox value
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const route = 'http://127.0.0.1:8000/menu/add-food/';

    // Create a FormData object to send form data with file uploads
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await api.post(route, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`,
          
          // Add any necessary headers, like authentication
        },
      });

      if (response.status === 201) {
        // Handle success (food item created successfully)
        toast.success('Food item added successfully');
        setFormData({
          name: '',
          image: null,
          description: '',
          category: '',
          price: '',
          is_spicy: false,
          is_available: true,
        });
        // Optionally, you can navigate to a different page here
      } else {
        // Handle errors (food item creation failed)
        toast.error('Food item upload failed. Please try again.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Food item upload error:', error);
      toast.error('Food item upload failed due to a network error.');
    }
  };

  return (
    <div >
      <NavbarRes/>
      
      
      <div className="flex justify-center items-center min-h-screen">

	<div class="container mx-auto my-4 items-center px-4 lg:px-20">
      <div class="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
			<div class="flex">
      <section class=" py-1 bg-blueGray-50">
      <h1 class="font-bold uppercase text-3xl">Food Item Management</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div >
          <label htmlFor="name" >Name:</label>
          <input  class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Food Item Name"
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Food Item Description"
          />
        </div>
        <div>
  <label>Category:</label>
  <div>
    <label>
      <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        type="radio"
        name="category"
        value="VEG"
        checked={formData.category === 'VEG'}
        onChange={handleChange}
      />
      Vegetarian
    </label>
    <label>
      <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        type="radio"
        name="category"
        value="NON_VEG"
        checked={formData.category === 'NON_VEG'}
        onChange={handleChange}
      />
      Non-Vegetarian
    </label>
  </div>
</div>

        <div>
          <label htmlFor="price">Price:</label>
          <input class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Food Item Price"
          />
        </div>
        <div>
          <label htmlFor="is_spicy">Is Spicy:</label>
          <input
            type="checkbox"
            name="is_spicy"
            id="is_spicy"
            checked={formData.is_spicy}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="is_available">Is Available:</label>
          <input
            type="checkbox"
            name="is_available"
            id="is_available"
            checked={formData.is_available}
            onChange={handleChange}
          />
        </div>
        <button type="submit" class="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">Add Food Item</button>
      </form>
      </section>
      </div>
      </div>
      </div>
      
    </div>
    </div>
  );
}

export default AddFood;
