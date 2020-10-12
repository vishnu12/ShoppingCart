import express from 'express'
const router=express.Router()

import { isAdmin, isSignedIn } from '../middlewares/authMiddleware.js'
import {
    addOrderItems, 
    getOrderById,
    updateOrderToPaid,
    listMyOrders,
    getAllOrders,
    updateOrderToDelivered
} from '../controllers/orderController.js'


router.post('/orders',isSignedIn,addOrderItems)

router.get('/orders/allorders',isSignedIn,isAdmin,getAllOrders)

router.get('/orders/:id',isSignedIn,getOrderById)

router.put('/orders/:id/pay',isSignedIn,updateOrderToPaid)

router.post('/orders/orderlist',isSignedIn,listMyOrders)

router.put('/orders/:id/deliver',isSignedIn,isAdmin,updateOrderToDelivered)




export default router