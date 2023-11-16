import React from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../Redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearUser());
        toast.success('Logged out');
        navigate('/')
        
    };
  return (
    <div
        className="block px-4 py-2 text-base font-medium text-red-500 hover:bg-gray-100"
        role="menuitem"
        onClick={handleLogout}
        style={{cursor: "pointer"}}
    >
        <lord-icon
            src="https://cdn.lordicon.com/jfhbogmw.json"
            trigger="loop"
            colors="primary:#c71f16"
            style={{width:"30px", height:"30px", paddingTop: "10px"}}>
        </lord-icon>
        Logout
    </div>
  )
}

export default Logout;
