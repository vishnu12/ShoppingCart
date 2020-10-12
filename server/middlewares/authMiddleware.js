
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

export const isSignedIn=asyncHandler(async (req,res,next)=>{
     
    const token=req.headers.authorization.split(" ")[1]
    if(token){
      try {
          const decoded=await jwt.verify(token,process.env.SECRET)
          const {id}=decoded
          req.user=await User.findById(id).select('-password')
          next()
      } catch (error) {
          console.log(error);
          res.status(401)
          throw new Error('Not authorized,token failed')
      }
    }
   if(!token){
       res.status(401)
       throw new Error('Not authorized,no token')
   }
   

})

export const isAdmin=asyncHandler(async(req,res,next)=>{
     
   if(req.user && req.user.isAdmin){
       next()
   }else{
       res.status(401)
       throw new Error('You are not authorized')
   }
})