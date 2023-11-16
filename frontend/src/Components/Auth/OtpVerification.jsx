import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosConfig';


const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');
  
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const emailAddress = useSelector(state => state.emailAddress);
  
    const handleOtpChange = (index, value) => {
      const newOtp = otp.split('');
      newOtp[index] = value;
      setOtp(newOtp.join(''));
    };

    useEffect(() => {
        if (!emailAddress) {
          navigate('/signup');
        }
    }, [user, navigate]);

    const handleVerifyOtp = async () => {
        try {
          const response = await api.post('http://127.0.0.1:8000/accounts/verify-otp/', {
            otp: otp,
            email: emailAddress,
          });
    
          if (response.status === 200) {
            setVerificationStatus('User is verified');
            toast.success('Account verified. You can now log in.');
            navigate('/login');
          } else {
            setVerificationStatus('OTP verification failed');
          }
        } catch (error) {
          console.error('OTP Verification Error:', error);
          toast.error('An error occurred during OTP verification');
        }
      };

  return (
    <div className="flex min-h-screen">
        <div className="flex flex-row w-full">


            <div className="flex flex-1 flex-col items-center justify-center px-10 relative">

                    <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                            <div className="flex flex-col items-center justify-center text-center space-y-2">
                                <div className="font-bold text-3xl">
                                    <p>Email Verification</p>
                                </div>
                                <div className="flex flex-row text-sm font-medium text-gray-400">
                                    {emailAddress && <p>We have sent a code to your email {emailAddress}</p>}
                                </div>
                            </div>

                            <div>
                                <form action="" method="post">
                                    <div className="flex flex-col space-y-16">
                                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">

                                            {Array.from({ length: 4 }).map((_, index) => (
                                            <div key={index} className="w-16 h-16">
                                                <input
                                                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                type="text"
                                                maxLength="1"
                                                value={otp[index] || ''}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                />
                                            </div>
                                            ))}

                                        </div>

                                        <div className="flex flex-col space-y-5">
                                            <div>
                                                <button
                                                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-m shadow-sm font-bold"
                                                    type="button"
                                                    onClick={handleVerifyOtp}
                                                >
                                                    Verify Account
                                                </button>
                                            </div>

                                            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                               
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  );
};

export default OtpVerification;
