import React, { useEffect, useState } from 'react';
// import Lottie from 'react-lottie';
// import animationData from '../assets/cycle - 1700746773362.json';
import './auth.css';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../utils/userContext.jsx';
import { Link, useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion'
import { delay } from 'framer-motion/dom';


// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData,
//   rendererSettings: {
//     preserveAspectRatio: 'xMidYMid slice',
//   },
// };

function Signup() {
  const { user,setUser } = useAuth();
  const navigate=useNavigate()
  const [details, setDetails] = useState({
    email: '',
    password: '',
  });

  useEffect(()=>{
    if(user&& Object.keys(user).length > 0){
      navigate('/')
    }
  },[user])

  async function  handleSubmit (e) {
    e.preventDefault();
    try {
      let res=await axiosInstance.post('/signup',details)
      localStorage.setItem('SkyUser',res.data.token)
      setUser(res.data.newUser)
    console.log(user,'user')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="signup-container">
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
          initial={{x:-1000,scale:0}}
        >
          SkyGoal
        </motion.h1>
      </div>
      <div className="flex justify-center items-center  w-2/6 mx-auto">
        <div className="container">
        <motion.div className="heading" whileHover={{scale:1.1}}>Sign In</motion.div>
          <form className="form"
           onSubmit={handleSubmit}
           >
            <motion.input
              required
              whileHover={{scale:1.1}}
              className="input"
              type="email"
              id="email"
              placeholder="E-mail"
              value={details.email}
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
            />
            <motion.input
              required
              whileHover={{scale:1.1}}
              className="input"
              type="password"
              id="password"
              placeholder="Password"
              value={details.password}
              onChange={(e) => setDetails({ ...details, password: e.target.value })}
            />
            <input className="login-button" type="submit" value="Sign In" />
          </form>
          <motion.div className="signup-link text-xs flex justify-center" whileHover={{scale:1.1}}>
            Already have account? <Link to="/login" className='font-bold text-sky-700'>Log In</Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Signup;