import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import Sidebar from '../Layout/AdminSideBar';

function AdminUserManagement() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blockAction, setBlockAction] = useState(true);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [acceptedFreelancers, setAcceptedFreelancers] = useState([]);
  const [userSearchInput, setUserSearchInput] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await api.get('http://127.0.0.1:8000/users/user-profiles/');
        setUserProfiles(userResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleBlockUnblock = async (userId) => {
    const newStatus = !blockAction;
    const endpoint = `http://127.0.0.1:8000/admin/block-unblock-user/${userId}/`;

    try {
      const response = await api.post(endpoint, { is_active: newStatus });
      console.log('Block/Unblock response:', response);

      setUserProfiles((prevState) =>
        prevState.map((profile) =>
          profile.user.id === userId
            ? { ...profile, user: { ...profile.user, is_active: newStatus } }
            : profile
        )
      );

      closeUserModal();
      setBlockAction(newStatus);
    } catch (error) {
      console.error('Error blocking/unblocking:', error);
    }
  };

  const openUserModal = (userId, blockAction) => {
    setSelectedUserId(userId);
    setBlockAction(blockAction);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-white bg-black uppercase border-b border-white-600">
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {userProfiles.map((profile) => (
                  <tr className="text-gray-700" key={profile.id}>
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                      {/* <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src={profile.image_url}
                        alt=""
                        loading="lazy"
                      />
                      <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                    </div> */}

                        <div>
                          <p className="font-semibold text-black">{profile.user.username}</p>
                          <p className="text-xs text-gray-600">{profile.user.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{profile.user.first_name} {profile.user.last_name}</td>
                    <td className="px-4 py-3 text-xs border">{profile.user.email}</td>
                    <td className="px-4 py-3 text-sm border">{profile.user.phone_number}</td>
                    <td className="px-4 py-3 text-sm border">
                    <button
      onClick={() => handleBlockUnblock(profile.user.id)}
      className="font-medium text-blue-600 dark:text-blue-500 hover:underline md:ml-2"
    >
      {profile.user.is_active ? 'Block' : 'Unblock'}
    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminUserManagement;
