import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/userContext.jsx";
import { useNavigate } from "react-router-dom";
import "./home.css";
import profilePic from "../assets/149071.png";
import EditDetails from "./editDetails.jsx";
import axiosInstance from "../utils/axiosInstance.js";

function Home() {
  const { user, setUser } = useAuth();
  const [editDetails, SetEditDetails] = useState(false);


  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    
  }, [user]);

  useEffect(()=>{
    const fetchData=async()=>{
        let userDetails=await axiosInstance.get('/getUserData')
        // console.log(userDetails.data)
        setUser(userDetails.data)
    }
    fetchData()
  },[])

  const logoutHandler = () => {
    localStorage.removeItem("SkyUser");
    setUser(null);
  };


  return (
    <div>
      <div className="w-full h-16 p-4 flex justify-between ">
        <div className="flex">
          <h1
            className="font-bold text-cyan-500  text-3xl"
            style={{ fontSize: "6vh" }}
          >
            SkyGoal
          </h1>
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
          <div
            className="flex justify-center bg-white w-3/5 rounded-2xl shadow"
            style={{ height: "65vh" }}
          >
            <div className="flex w-full justify-center">
              <div className="w-2/5 flex justify-center items-center">
                <div className="w-64 h-64 rounded-full">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-64 h-64 rounded-full"
                  />
                </div>
              </div>
              <div className="w-3/5">
                <p className=" font-bold text-gray-800 mt-8 text-3xl">
                  User Details
                </p>
                <div className="mt-4 text-xl  flex flex-col justify-center">
                  <p className="my-2">{user ? user.name : null}</p>
                  <p className="my-2">{user ? user.phone : null}</p>
                  <p className="my-2">{user ? user.email : null}</p>
                  <p className="my-2">{user ? user.Address : null}</p>
                  <button
                    className="mt-8 rounded-2xl bg-cyan-600 text-white p-2 w-3/5 flex justify-center"
                    onClick={() => SetEditDetails(!editDetails)}
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
