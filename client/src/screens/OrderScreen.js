import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder,deliverOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET} from '../constants/orderConstants'

const OrderScreen = ({ match,history }) => {

    const orderId = match.params.id
    const dispatch = useDispatch()
    
    const [sdkReady, setSdkReady] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { user} = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay,success:successPay } = orderPay


    const orderDeliver = useSelector(state => state.orderDeliver)
    const {success:successDeliver } = orderDeliver


    useEffect(() => {

        if(!user){
           history.push('/login')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload=()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
    
        }
        if(!order || order._id !== orderId || successPay || successDeliver) {
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    }, [dispatch,order, orderId,successPay,successDeliver,user,history]) 

const successPayHandler=(paymentResult)=>{
   console.log(paymentResult)
   dispatch(payOrder(orderId,paymentResult))
}


const deliverHandler=(orderId)=>{
    dispatch(deliverOrder(orderId))
}

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
        :
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p><strong>Name :</strong> {order.user.name}</p>
                            <p><strong>Email :</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address},
                          {order.shippingAddress.city},
                          {order.shippingAddress.postalCode},
                          {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                :
                                <Message variant='danger'>Not delivered</Message>
                            }
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>

                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message>
                                :
                                <Message variant='danger'>Not paid</Message>
                            }
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Your Order List</h2>
                            {order.orderItems.length === 0 ? <Message>Order is empty</Message>
                                :
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, k) => {
                                        return <ListGroupItem key={k}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.id}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price}=
                                            {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    })}
                                </ListGroup>
                            }
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>$ {order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>$ {order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>$ {order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>$ {order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            {!order.isPaid &&(
                                <ListGroupItem>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader />
                                    :
                                    <PayPalButton
                                    amount={order.totalPrice}
                                    onSuccess={(paymentResult)=>successPayHandler(paymentResult)}>

                                    </PayPalButton>
                                    }
                                </ListGroupItem>
                            )}

                            {user && user.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroupItem>
                                    <Button type='button' className='btn btn-block' onClick={()=>deliverHandler(order._id)}>
                                    Mark as delivered
                                    </Button>
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
}

export default OrderScreen
