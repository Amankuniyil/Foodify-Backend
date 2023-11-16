import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setEmailAddress, setUser } from '../../Redux/store';

function RestaurantRegister() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailAddress = useSelector(state => state.emailAddress);
    const user = useSelector(state => state.user);
    const authToken = useSelector(state => state.accessToken);

    const [restaurant_type, setType] = useState('');
    const [restaurant_name, setRestaurantName] = useState('')
    const [about, setAbout] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [registration_number, setRegistration] = useState('');
    const [year_of_experience, setYearOfExperience] = useState('');
    const [opening_time, setOpen] = useState('');
    const [profile_photo, setProfilePhoto] = useState(null);
    const [image, setImage] = useState(null);
    const [license, setLicense] = useState(null)
    const [fssai, setFssai] = useState(null)
    console.log(authToken)
    const userId = user.user_id;
    const route = `http://127.0.0.1:8000/restaurant/restaurant-createprofile/${userId}/`;


    const handleRegisterProfile = async () => {

        const formData = new FormData();
        formData.append('restaurant_type', restaurant_type);
        formData.append('restaurant_name', restaurant_name);
        formData.append('about', about);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('registration_number', registration_number);
        formData.append('year_of_experience', year_of_experience);
        formData.append('opening_time', opening_time);
        formData.append('profile_photo', profile_photo);
        formData.append('image', image);
        formData.append('license', license);
        formData.append('fssai', fssai);
        

        try {
            const response = await api.put(route, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`,
                },
            });
        
            if (response.status === 200) {
                navigate('/Restaurant/pendning');
                toast.success('Registration Success')
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed due to a network error.');
        }
    };



   
    return (
        <div className="flex min-h-screen bg-yellow-200">
            <div className="flex flex-row w-full">

    
                <div className="flex flex-1 flex-col items-center justify-center px-10 relative">

                    <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md">
                        <div className="flex flex-col space-y-2 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold">Register as Patner</h2>
                            <p className="text-md md:text-xl">
                                Register your <span className="font-medium">Restaurant</span> and then become a{' '}
                                <span className="font-medium">Patner!</span>
                            </p>
                        </div>
                        <div className="flex flex-col max-w-md space-y-5">
                            <select
                                value={restaurant_type}
                                onChange={(e) => setType(e.target.value)}
                                className={`flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg ${
                                    restaurant_type ? 'font-semibold' : 'font-normal'
                                } ${restaurant_type === '' ? 'text-[#9ca3af]' : 'text-black'}`}
                            >
                                <option value="">Select Your Restaurant Type</option>
                                <option value="Veg">Veg</option>
                                <option value="Non-Veg">Non-Veg</option>
                              
                            </select>

                            <input
                                type="Restaurant Name"
                                placeholder="Name"
                                value={restaurant_name}
                                onChange={(e) => setRestaurantName(e.target.value)}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />

                            <textarea
                                placeholder="About the Restaurant"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                rows={3}
                            />
                            <textarea
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                rows={3}
                            />

                            <div className="flex">
                                <div className="flex-1 pr-2">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3 w-full border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                </div>
                                <div className="flex-1 pl-2">
                                    <input
                                        type="text"
                                        placeholder="State"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3 w-full border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-1 pr-2">
                                    <input
                                        type="text"
                                        placeholder="Registration Number"
                                        value={registration_number}
                                        onChange={(e) => setRegistration(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3 w-full border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                </div>
                                <div className="flex-1 pl-2">
                                    <input
                                        type="number"
                                        placeholder="Year of Experience"
                                        value={year_of_experience}
                                        onChange={(e) => setYearOfExperience(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3 w-full border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                        min={0}
                                    />
                                </div>
                            </div>

                            <input
                                type="text"
                                placeholder="opening time"
                                value={opening_time}
                                onChange={(e) => setOpen(e.target.value)}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfilePhoto(e.target.files[0])}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setLicense(e.target.files[0])}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFssai(e.target.files[0])}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />
                            <button
                                className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-black text-white"
                                type="button"
                                onClick={handleRegisterProfile}
                            >
                                Register your Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            


        </div>
        



      );
}

export default RestaurantRegister