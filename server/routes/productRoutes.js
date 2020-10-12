import express from 'express'
const router=express.Router()

import {
    getProducts,
    getSingleProduct,
    deleteProduct, 
    updateProduct, 
    createProduct, 
    createProductReviews,
    getTopRatedProducts
      } from '../controllers/productController.js'
import {isSignedIn,isAdmin} from '../middlewares/authMiddleware.js'


router.get('/products',getProducts)
//or router.route('/').get(getProducts)

router.get('/products/:id',getSingleProduct)

router.delete('/products/:id',isSignedIn,isAdmin,deleteProduct)

router.post('/products/create',isSignedIn,isAdmin,createProduct)

router.put('/products/:id',isSignedIn,isAdmin,updateProduct)


//reviews
router.post('/products/:id/reviews',isSignedIn,createProductReviews)


//top rated products

router.get('/products/find/top',getTopRatedProducts)


export default router