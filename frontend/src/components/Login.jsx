import React, { useEffect, useState } from "react";
// import Lottie from "react-lottie";
// import animationData from '../assets/cycle - 1700746773362.json';
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useAuth } from "../utils/userContext.jsx";
import axiosInstance from "../utils/axiosInstance";
import { motion } from 'framer-motion'
import { delay } from 'framer-motion/dom';

// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };

function Login() {
  const { user, setUser } = useAuth();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user,'user')
    if (user&& Object.keys(user).length > 0) {
      navigate("/");
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axiosInstance.post("/login", details);
      localStorage.setItem("SkyUser", res.data.token);
      setUser(res.data.user);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="Login-container">
      {/* <div className="lottie-animation">
        <Lottie options={defaultOptions} />
      </div> */}
      <div className="flex justify-center">
        <motion.h1
          className="font-bold text-white"
          style={{
            fontSize: "15vh",
          }}
          transition={{delay:1,duration:0.4}}
          animate={{x:0,scale:1}}
          initial={{x:1000,scale:0}}
        >
          SkyGoal
        </motion.h1>
      </div>
      <div className="flex justify-center items-center  w-2/6 mx-auto">
        <div className="container">
          <motion.div className="heading" whileHover={{scale:1.1}}>Log In</motion.div>
          <form className="form" onSubmit={handleSubmit}>
            <motion.input
            whileHover={{scale:1.1}}
              required
              className="input"
              type="email"
              id="email"
              placeholder="E-mail"
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
            />
            <motion.input
            whileHover={{scale:1.1}}
              required
              className="input"
              type="password"
              id="password"
              placeholder="Password"
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
            />
            <input className="login-button" type="submit" value="Log In" />
          </form>
          <motion.div className="signup-link text-xs flex justify-center" whileHover={{scale:1.1}}>
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-sky-700">
              Sign up
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;
