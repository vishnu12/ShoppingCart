import axios from 'axios'
import {
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_REMOVE,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    // USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    // USER_UPDATE_RESET,
    USER_UPDATE_SUCCESS
    } from '../constants/userConstants'

export const login=(email,password)=>async(dispatch)=>{

      try {
          dispatch({
              type:USER_LOGIN_REQUEST
          })
          const loginData={
              email,
              password
          }
          const {data}=await axios.post('/login',loginData)
          dispatch({
              type:USER_LOGIN_SUCCESS,
              payload:data
          })
          localStorage.setItem('user',JSON.stringify(data))
      } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
      }
}


export const logout=()=>(dispatch)=>{
    localStorage.removeItem('user')
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_REMOVE})
    dispatch({type:USER_LIST_RESET})
}


export const register=(name,email,password)=>async(dispatch)=>{

    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const regData={
            name,
            email,
            password
        }
        const {data}=await axios.post('/signup',regData)
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })

        const {data:logData}=await axios.post('/login',{email,password})
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:logData
        })
        localStorage.setItem('user',JSON.stringify(logData))
    } catch (error) {
      dispatch({
          type:USER_REGISTER_FAIL,
          payload:error.response && error.response.data.message?
          error.response.data.message : error.message
      })
    }
}

export const getUserDetail=(id)=>async(dispatch,getState)=>{

    try {
        dispatch({
            type:USER_DETAILS_REQUEST
        })
       const {userLogin:{user}}=getState()
        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }
        const {data}=await axios.get(`/${id}`,config)
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })

    } catch (error) {
      dispatch({
          type:USER_DETAILS_FAIL,
          payload:error.response && error.response.data.message?
          error.response.data.message : error.message
      })
    }
}

export const updateUserProfile=(value)=>async(dispatch,getState)=>{
   
    try {
        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST
        })
       const {userLogin:{user}}=getState()
        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }
        const {data}=await axios.put('/profile',value,config)
       
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })

    } catch (error) {
      dispatch({
          type:USER_UPDATE_PROFILE_FAIL,
          payload:error.response && error.response.data.message?
          error.response.data.message : error.message
      })
    }
}

export const listUsers=()=>async(dispatch,getState)=>{
   
    try {
        dispatch({
            type:USER_LIST_REQUEST
        })
       const {userLogin:{user}}=getState()
        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }
        const {data}=await axios.get('/users',config)
       
        dispatch({
            type:USER_LIST_SUCCESS,
            payload:data
        })

    } catch (error) {
      dispatch({
          type:USER_LIST_FAIL,
          payload:error.response && error.response.data.message?
          error.response.data.message : error.message
      })
    }
}


export const deleteUser=(id)=>async(dispatch,getState)=>{
   
    try {
        dispatch({
            type:USER_DELETE_REQUEST
        })
       const {userLogin:{user}}=getState()
        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }
        await axios.delete(`/delete/${id}`,config)
       
        dispatch({
            type:USER_DELETE_SUCCESS,
        })

    } catch (error) {
      dispatch({
          type:USER_DELETE_FAIL,
          payload:error.response && error.response.data.message?
          error.response.data.message : error.message
      })
    }
}

export const updateUser=(userData)=>async(dispatch,getState)=>{
   
    try {
        dispatch({
            type:USER_UPDATE_REQUEST
        })
       const {userLogin:{user}}=getState()
        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }
        const {data}= await axios.put(`/${userData._id}`,userData,config)
       
        dispatch({
            type:USER_UPDATE_SUCCESS,
        })

        dispatch({type:USER_DETAILS_SUCCESS,payload:data})

    } catch (error) {
      dispatch({
          type:USER_UPDATE_FAIL,
          payload:error.response && error.response.data.message?
          error.response.data.message : error.message
      })
    }
}