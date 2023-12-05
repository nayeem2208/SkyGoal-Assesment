import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/userContext";
import axiosInstance from "../utils/axiosInstance";

function EditDetails({ setEditDetails }) {
  const { user, setUser } = useAuth();
  const [userData, setUserData] = useState({});


  useEffect(() => {
    setUserData({
      name: user ? user.name : "",
      phone: user ? user.phone : "",
      email: user ? user.email : "",
      address: user ? user.Address : "",
    });
  }, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.patch("/editDetails", { userData });
      setUser(res.data.saveUser);
      setEditDetails((prevValue) => !prevValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center bg-white w-3/5 rounded-2xl shadow-lg p-8">
      <div className="flex flex-col w-full">
        <p className="text-center font-bold text-gray-800 text-3xl mb-4">
          Edit Details
        </p>
        <div className="text-xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 shadow-lg">
              <input
                type="text"
                name="name"
                value={userData.name}
                className="w-full border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 shadow-lg">
              <input
                type="text"
                name="phone"
                value={userData.phone}
                className="w-full border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                placeholder="Phone"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 shadow-lg">
              <input
                type="text"
                name="email"
                value={userData.email}
                className="w-full border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 shadow-lg">
              <textarea
                type="text"
                name="address"
                value={userData.address}
                className="w-full border rounded py-2 px-3 focus:shadow-outline"
                placeholder="Address"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditDetails;
