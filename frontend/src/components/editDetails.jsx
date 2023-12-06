import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/userContext";
import axiosInstance from "../utils/axiosInstance";
import {motion} from 'framer-motion'

function EditDetails({ setEditDetails }) {
    const { user, setUser } = useAuth();
    const [userData, setUserData] = useState({
      name: "",
      phone: "",
      email: "",
      address: "",
      profilePic: null, // Added for profile picture
    });
  
    useEffect(() => {
      if (user) {
        setUserData({
          name: user.name || "",
          phone: user.phone || "",
          email: user.email || "",
          address: user.Address || "",
          profilePic: user.profilePic || null,
        });
      }
    }, [user]);
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
  
      // If the input is a file input, set the profilePic to the selected file
      if (name === "image" && files && files.length > 0) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          profilePic: files[0],
        }));
      } else {
        setUserData((prevUserData) => ({
          ...prevUserData,
          [name]: value,
        }));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("phone", userData.phone);
        formData.append("email", userData.email);
        formData.append("address", userData.address);
        formData.append("image", userData.profilePic); // Append profilePic as a file
  
        const res = await axiosInstance.patch("/editDetails", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        setUser(res.data.saveUser);
        setEditDetails((prevValue) => !prevValue);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="flex justify-center bg-white w-3/5 rounded-2xl shadow-lg p-8">
      <div className="flex flex-col w-full">
        <p className="text-center font-bold text-sky-700 text-3xl mb-4">
          Edit Details
        </p>
        <div className="text-lg text-sky-700">
          <form onSubmit={handleSubmit} >
            <motion.div className="mb-4 shadow-lg " whileHover={{scale:1.01}}>
              <motion.input
                type="text"
                name="name"
                whileHover={{backgroundColor:'#33ace8',color:'white'}}
                value={userData.name}
                className="w-full border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                placeholder="Name"
                onChange={handleChange}
              />
            </motion.div>
            <motion.div className="mb-4 shadow-lg" whileHover={{scale:1.01}}>
              <motion.input
                type="text"
                name="phone"
                whileHover={{backgroundColor:'#33ace8',color:'white'}}
                value={userData.phone}
                className="w-full border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                placeholder="Phone"
                onChange={handleChange}
              />
            </motion.div>
            <motion.div className="mb-4 shadow-lg" whileHover={{scale:1.01}}>
              <motion.input
                type="text"
                name="email"
                whileHover={{backgroundColor:'#33ace8',color:'white'}}
                value={userData.email}
                className="w-full border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                placeholder="Email"
                onChange={handleChange}
              />
            </motion.div>
            <motion.div className="mb-4 shadow-lg" whileHover={{scale:1.01}}>
              <motion.textarea
                type="text"
                name="address"
                whileHover={{backgroundColor:'#33ace8',color:'white'}}
                value={userData.address}
                className="w-full border rounded py-2 px-3 focus:shadow-outline"
                placeholder="Address"
                onChange={handleChange}
              />
            </motion.div>
            <div>
                <input type="file" name="image" onChange={handleChange}/>
            </div>
            <div className="flex  my-4">
            <motion.button
              type="submit"
              
              className="mt-4 mx-3 bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </motion.button>
            <motion.button
            
              onClick={()=>setEditDetails(false)}
              className="mt-4 mx-3 bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 focus:outline-none focus:shadow-outline"
            >
              cancel
            </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditDetails;
