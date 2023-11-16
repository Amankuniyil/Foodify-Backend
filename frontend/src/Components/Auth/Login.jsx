import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { setUser, setEmailAddress, setRefreshToken, setTokenExpiry, setAccessToken } from '../../Redux/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailAddress = useSelector(state => state.emailAddress);
    const user = useSelector(state => state.user);
    const tokenExpiry = useSelector(state => state.tokenExpiry);
    const refreshToken = useSelector(state => state.refreshToken);
    const accessToken = useSelector(state => state.accessToken);

    console.log('Stored Email in Redux:', emailAddress);
    console.log('User Details in Redux:', user);

    const handleLogin = async () => {
        try {
            const response = await api.post('http://127.0.0.1:8000/accounts/signin/', {
                email: email,
                password: password,
            });
    
            if (response.status === 200) {
                const { user, access_token, refresh_token, token_expiry } = response.data;
                dispatch(setUser(user));
                dispatch(setEmailAddress(email));
                dispatch(setAccessToken(access_token));
                dispatch(setRefreshToken(refresh_token));
                dispatch(setTokenExpiry(token_expiry));
                toast.success('Logged in successfully.');
                if (user.user_type === "Admin") {
                    navigate('/admin');
                } else if (user.user_type === "User") {
                    navigate('/');
                } else if (user.user_type === "Restaurant") {
                    if (user.is_profile) {
                        navigate('/Restaurant');
                      } else {
                        navigate('/Restaurant/register');
                      }
                }
                
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('An error occurred during login.');
        }
    };
    
    
    return (
      <div className="flex min-h-screen">
        <div className="flex flex-row w-full">
          <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
            <div className="bg-yellow-100 p-6 rounded-lg max-w-md w-full">
              <div className="flex flex-col space-y-5 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Login Now!</h2>
                <p className="text-md md:text-xl">Login to order your favorite food <span className="font-medium">Restaurant!</span></p>
              </div>
              <form className="flex flex-col max-w-md space-y-5">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex px-3 py-2 md:px-4 md:py-3 border border-yellow-300 rounded-lg font-medium placeholder:font-normal"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex px-3 py-2 md:px-4 md:py-3 border border-yellow-300 rounded-lg font-medium placeholder:font-normal"
                />
                <button
                  className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-yellow-500 text-white hover:bg-yellow-600"
                  type="button"
                  onClick={handleLogin}
                >
                  Login Account
                </button>
                
              </form>
              <br />
              <Link to="/signup">
        <button>Dont have an account? Signup</button>
      </Link>
            </div>
          </div>

        </div>
      </div>
    );
    
    
}

export default Login;
