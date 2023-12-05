import express from 'express'
import { editDetails, getUserDetails, login, register } from '../controllers/userController.js'
import authcheck from '../middleware/auth.js'
const router=express.Router()

// router.get('/check',login)
router.post('/login',login)
router.post('/signup',register)
router.get('/getUserData',authcheck,getUserDetails)
router.patch('/editDetails',authcheck,editDetails)


export default router