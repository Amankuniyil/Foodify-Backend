import React, { useState, useEffect } from 'react';
import { setUser, setEmailAddress } from '../../Redux/store';
import { useSelector, useDispatch } from 'react-redux';
import OtpVerification from './OtpVerification';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  const [error, setError] = useState('');
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [otpVerification, setOtpVerification] = useState(false);

  const dispatch = useDispatch();
  const emailAddress = useSelector(state => state.emailAddress);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setAllFieldsFilled(
      firstName !== '' &&
      lastName !== '' &&
      userName !== '' &&
      email !== '' &&
      phone !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      userType !== ''
    );
  }, [firstName, lastName, userName, email, phone, password, confirmPassword, userType]);

  const handleEmailChange = (value) => {
    setEmail(value);

    if (!value.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/)) {
      if (error !== 'phone' && error !== 'password' && error !== 'confirm password') {
        setError('email');
      }
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
      if (error === 'email') setError('');
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);

    if (!/^\d{10}$/.test(value)) {
      if (error !== 'email' && error !== 'password' && error !== 'confirm password') {
        setError('phone');
      }
      setPhoneError('Phone number must be 10 digits');
    } else {
      setPhoneError('');
      if (error === 'phone') setError('');
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);

    if (value.length < 5) {
      if (error !== 'email' && error !== 'phone' && error !== 'confirm password') {
        setError('password');
      }
      setPasswordError('Password must be at least 5 characters');
    } else {
      setPasswordError('');
      if (error === 'password') setError('');
    }

    if (confirmPassword !== value) {
      if (error !== 'email' && error !== 'phone' && error !== 'password') {
        setError('confirm password');
      }
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
      if (error === 'confirm password') setError('');
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);

    if (password !== value) {
      if (error !== 'email' && error !== 'phone' && error !== 'password') {
        setError('confirm password');
      }
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
      if (error === 'confirm password') setError('');
    }
  };

  const handleSignup = async () => {
    try {
      const response = await api.post('http://127.0.0.1:8000/accounts/signup/', {
        
        first_name: firstName,
        last_name: lastName,
        username: userName,
        email: email,
        phone_number: phone,
        password: password,
        user_type: userType,
      });
  
      console.log('Request Payload:', {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        email: email,
        phone_number: phone,
        password: password,
        user_type: userType,
      });
  
      console.log('Response:', response.data);
  
      if (response.status === 201) {
        dispatch(setUser(response.data));
        dispatch(setEmailAddress(email));
        toast.success("Registration success. Please Enter your OTP and verify your account.");
        navigate('/otp-verification');

      } else {
        toast.error("Error occurred! Please check your inputs");
      }
    } catch (error) {
      console.error('Signup Error:', error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Error occurred! Please check your inputs');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r bg-yellow-200 text-dark">
      <div className="flex flex-row w-full">
  
        <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
          <div className="flex lg:hidden justify-between items-center w-full py-4">
  
            <div className="flex items-center space-x-2">
              <span>Have an Account? </span>
              <Link to="/login" className="underline font-bold text-white hover:text-blue-300">
                Login now
              </Link>
            </div>
          </div>
  
          <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md">
            <div className="flex flex-col space-y-2 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Register Account</h2>
              <p className="text-md md:text-xl">Sign Up to <span className='font-medium'>foodify</span> or to become <span className='font-medium'>our patner</span></p>
            </div>
  
 
  
  <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />

                        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />

                        <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />

                        <input type="email" placeholder="Email" value={email} onChange={(e) => handleEmailChange(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
                        {error === 'email' && <p className="text-xs text-red-500">{emailError}</p>}
                 
                

                        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => handlePhoneChange(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
                        {error === 'phone' && <p className="text-xs text-red-500">{phoneError}</p>}

                        <input type="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
                        {error === 'password' && <p className="text-xs text-red-500">{passwordError}</p>}
                        
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
                        {error === 'confirm password' && <p className="text-xs text-red-500">{confirmPasswordError}</p>}


  
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className={`flex px-3 py-2 md:px-4 md:py-3 border-2 border-dark rounded-lg ${userType ? 'font-semibold' : 'font-normal'} ${userType === '' ? 'text-[#9ca3af]' : 'text-dark'}`}
            >
              <option value="">Select User Type</option>
              <option value="Restaurant">Restaurant</option>
              <option value="User">User</option>
            </select>
            <button 
                            className={`flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium ${allFieldsFilled ? 'bg-blue-700 text-white' : 'border-black bg-black text-white'}`}
                            type="submit"
                            onClick={handleSignup}
                            disabled={!allFieldsFilled}
                            >
                            Confirm this Account
                        </button>
  
            <div className="mt-2 text-center">
              {allFieldsFilled ? "" : <p className="text-s text-red-500">All fields are required</p>}
            </div>
            <Link to="/login">
        <button>Signin</button>
      </Link>
          </div>
        </div>
      </div>
    </div>
  );
  
};






export default Signup;
