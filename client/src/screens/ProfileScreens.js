import React,{useState,useEffect} from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listMyOrders } from '../actions/orderActions'
import {getUserDetail,updateUserProfile} from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProfileScreen = ({location,history}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch=useDispatch()
    
    const userDetails=useSelector(state=>state.userDetails)
    const {userInfo,loading,error}=userDetails

    const userLogin=useSelector(state=>state.userLogin)
    const {user}=userLogin

    const updateUser=useSelector(state=>state.updateUser)
    const {success}=updateUser

    const orderListMy=useSelector(state=>state.orderListMy)
    const {orders,loading:orderListLoading,error:orderListError}=orderListMy

    useEffect(()=>{
       if(!user){
          history.push('/login')
       }
       else if(!(userInfo && userInfo.name && userInfo.email)){
        dispatch(getUserDetail('profile'))
        dispatch(listMyOrders())
       }else{
        setName(userInfo.name)
        setEmail(userInfo.email)
       }
    },[dispatch,history,userInfo,user])
     
   
  
    const submit=e=>{
        e.preventDefault()
        if(password !==confirmPassword){
          setMessage('Passwords do not match')
        }else{
         let data={
             name,
             email,
             password
         } 
         
         console.log(data)
         dispatch(updateUserProfile(data))
        }
        
    }

  return (
    <Row>
        <Col md={3}>
        <h2>User Profile</h2>
  {message && <Message variant='danger'>{message}</Message>}
  {error && <Message variant='danger'>{error}</Message>}
  {success && <Message variant='success'>Profile Updated</Message>}
  {loading && <Loader />}
<Form onSubmit={submit}>
<Form.Group controlId='name'>
<Form.Label>Name</Form.Label>
<Form.Control type='text' placeholder='Enter Name'
value={name} onChange={e=>setName(e.target.value)}/>
</Form.Group>
<Form.Group controlId='email'>
<Form.Label>Email</Form.Label>
<Form.Control type='email' placeholder='Enter Email'
value={email} onChange={e=>setEmail(e.target.value)}/>
</Form.Group>
<Form.Group controlId='password'>
<Form.Label>Password</Form.Label>
<Form.Control type='password' placeholder='Enter Password'
value={password} onChange={e=>setPassword(e.target.value)}/>
</Form.Group>
<Form.Group controlId='confirmPassword'>
<Form.Label>Password</Form.Label>
<Form.Control type='password' placeholder='Enter Password to confirm'
value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
</Form.Group>
<Button type='submit' variant='primary'>
 Update
</Button>
</Form> 
        </Col>
        <Col md={9}>
            <h2>My orders</h2>
            {orderListLoading?<Loader />
            :
            orderListError ?<Message variant='danger'>{orderListError}</Message>
            :
            (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&  orders.map(order=>{
                   return <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid?order.paidAt.substring(0,10):<i className='fas fa-times' style={{color:'red'}}></i>}</td>
                    <td>{order.isDelivered?order.deliveredAt.substring(0,10):<i className='fas fa-times' style={{color:'red'}}></i>}</td>
                    <td><LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                      Details
                      </Button>
                    </LinkContainer></td>
                    </tr>
                  })}
                </tbody>
              </Table>
            )
            }
        </Col>
    </Row>
  )
}

export default ProfileScreen
