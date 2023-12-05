import express from 'express'
import { login } from '../controllers/userController.js'
const router=express.Router()

// router.get('/check',login)
router.post('/login',login)

export default router