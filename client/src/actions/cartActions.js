import axios from 'axios'

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'


export const addItemsToCart=(prodId,qty)=>async(dispatch,getState)=>{
    
    const {data}=await axios.get(`/products/${prodId}`)
    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            id:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            stock:data.stock,
            qty
        }
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}


export const removeItemsFromCart=(id)=>(dispatch,getState)=>{
    
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress=(data)=>(dispatch)=>{
    
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })

    localStorage.setItem('shippingAddress',JSON.stringify(data))
}

export const savePaymentMethod=(data)=>(dispatch)=>{
    
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data
    })

    localStorage.setItem('paymentMethod',JSON.stringify(data))
}