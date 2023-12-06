import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/userContext.jsx";
import { useNavigate } from "react-router-dom";
import "./home.css";
import profilePic from "../assets/149071.png";
import EditDetails from "./editDetails.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import {motion} from 'framer-motion'

function Home() {
  const { user, setUser } = useAuth();
  const [editDetails, SetEditDetails] = useState(false);


  const navigate = useNavigate();


  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      navigate("/login");
    }
  }, [user]);
  console.log(user,'user')
  useEffect(()=>{
    const fetchData=async()=>{
        let userDetails=await axiosInstance.get('/getUserData')
        // console.log(userDetails.data)
        setUser(userDetails.data)
    }
    if(user){

        fetchData()
    }
  },[])

  const logoutHandler = () => {
    localStorage.removeItem("SkyUser");
    setUser(null);
  };
  console.log(user,'user')

  return (
    <div>
      <div className="w-full h-16 p-4 flex justify-between ">
        <div className="flex">
          <motion.h1
            className="font-bold text-sky-400 mt-3 text-3xl"
            style={{ fontSize: "6vh" }}
            whileHover={{scale:1.3,x:20}}
          >
            SkyGoal
          </motion.h1>
        </div>
        {user ? (
          <button className="btn  font-bold mt-4" onClick={logoutHandler}>
            {" "}
            Logout
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-center mt-12">
        {editDetails ? (
          <EditDetails setEditDetails={SetEditDetails} />
        ) : (
          <motion.div
            className="flex justify-center bg-white w-3/5 rounded-2xl shadow"
            style={{ height: "65vh" }}
            whileHover={{scale:1.03}}
          >
            <div className="flex w-full justify-center text-sky-900">
              <div className="w-2/5 flex justify-center items-center">
                <div className="w-64 h-64 rounded-full">
                  <motion.img
                    src={user?.profilePic?`http://localhost:3000/images/${user.profilePic}`:profilePic}
                    whileHover={{scale:2}}
                    alt="Profile"
                    className="w-64 h-64 rounded-full"
                  />
                </div>
              </div>
              <div className="w-3/5">
                <p className=" font-bold text-sky-800 mt-8 text-3xl">
                  User Details
                </p>
                <div className="mt-4 text-xl  flex flex-col justify-center">
                  <p className="my-2">{user ? user.name : null}</p>
                  <p className="my-2">{user ? user.phone : null}</p>
                  <p className="my-2">{user ? user.email : null}</p>
                  <p className="my-2">{user ? user.Address : null}</p>
                  <motion.button
                    whileHover={{ boxShadow: '0px 4px 8px rgba(51, 172, 232, 0.5)' }}
                    className="mt-8 rounded-2xl bg-cyan-600 text-white p-2 w-3/5 flex justify-center"
                    onClick={() => SetEditDetails(!editDetails)}
                  >
                    Edit Details
                  </motion.button>
                  
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Home;
