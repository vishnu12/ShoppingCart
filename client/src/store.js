
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { 
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers'

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer
} from './reducers/orderReducers'

const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productCreateReview:productReviewCreateReducer,
    productTopRated:productTopRatedReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    updateUser:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer
    
})

const cartItemsFromStorage=localStorage.getItem('cartItems')?
JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoFromStorage=localStorage.getItem('user')?
JSON.parse(localStorage.getItem('user')):null

const shippingAddressFromStorage=localStorage.getItem('shippingAddress')?
JSON.parse(localStorage.getItem('shippingAddress')):{}

const paymentMethodFromStorage=localStorage.getItem('paymentMethod')?
JSON.parse(localStorage.getItem('paymentMethod')):''

const initialState={
    cart:{
        cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage,
        paymentMethod:paymentMethodFromStorage
    },
    userLogin:{user:userInfoFromStorage},
}
const middleware=[thunk]

const store=createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))


export default store