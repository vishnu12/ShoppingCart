import express from 'express'
const router=express.Router()

import {
    authUser,
    deleteUser,
    getAllUsers,
    getUserProfile,
    signUp,
    updateProfile,
    getUserById,
    updateUser
} from '../controllers/userController.js'
import { isAdmin, isSignedIn } from '../middlewares/authMiddleware.js'


router.get('/profile',isSignedIn,getUserProfile)
router.post('/login',authUser)
router.post('/signup',signUp)

router.put('/profile',isSignedIn,updateProfile)

router.get('/users',isSignedIn,isAdmin,getAllUsers)

router.get('/:id',isSignedIn,isAdmin,getUserById)

router.put('/:id',isSignedIn,isAdmin,updateUser)

router.delete('/delete/:id',isSignedIn,isAdmin,deleteUser)




export default router