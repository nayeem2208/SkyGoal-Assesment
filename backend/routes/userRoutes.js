import express from 'express'
import path from "path";
import multer from "multer";
import { editDetails, getUserDetails, login, register } from '../controllers/userController.js'
import authcheck from '../middleware/auth.js'

const router=express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "backend/public/images");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  const upload = multer({
    storage: storage,
  });
  

// router.get('/check',login)
router.post('/login',login)
router.post('/signup',register)
router.get('/getUserData',authcheck,getUserDetails)
router.patch('/editDetails',authcheck,upload.single("image"),editDetails)


export default router