import React,{useEffect} from 'react'
import { Button,Row,Col,ListGroup,Image,Card, ListGroupItem} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

const PlaceOrderScreen = ({history}) => {

    const cart=useSelector(state=>state.cart)
    const dispatch=useDispatch()
    //calcute prices
    
    cart.itemsPrice=cart.cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)

    cart.shippingPrice=cart.itemsPrice<100?0:100
    cart.taxPrice=(0.15*cart.itemsPrice).toFixed(2)
    cart.totalPrice=(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)
   

   const orderCreate=useSelector(state=>state.orderCreate)
   const {order,success,error}=orderCreate

  useEffect(()=>{
      if(success){
          history.push(`/order/${order._id}`)

      }
      // eslint-disable-next-line
  },[history,success])

    const placeOrder=()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,
            

        }))
    }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4/>
      <Row>
          <Col md={8}>
              <ListGroup variant='flush'>
                  <ListGroupItem>
                      <h2>Shipping</h2>
                      <p>
                          <strong>Address: </strong>
                          {cart.shippingAddress.address},
                          {cart.shippingAddress.city},
                          {cart.shippingAddress.postalCode},
                          {cart.shippingAddress.country}
                      </p>
                  </ListGroupItem>

                  <ListGroupItem>
                      <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                  </ListGroupItem>

                  <ListGroupItem>
                      <h2>Your Order List</h2>
                        {cart.cartItems.length===0?<Message>Your cart is empty</Message>
                        :
                        <ListGroup variant='flush'>
                        {cart.cartItems.map((item,k)=>{
                            return <ListGroupItem key={k}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                        <Link to={`/product/${item.id}`}>
                                            {item.name}
                                        </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x {item.price}=
                                            {item.qty*item.price}
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
                    <Col>$ {cart.itemsPrice}</Col>
                          </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                          <Row>
                              <Col>Shipping</Col>
                    <Col>$ {cart.shippingPrice}</Col>
                          </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                          <Row>
                              <Col>Tax</Col>
                    <Col>$ {cart.taxPrice}</Col>
                          </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                          <Row>
                              <Col>Total</Col>
                    <Col>$ {cart.totalPrice}</Col>
                          </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                    {error && <Message variant='danger'>{error}</Message>}
                      </ListGroupItem>
                      <ListGroupItem>
                          <Button type='button' className='btn btn-block'
                          disabled={cart.cartItems.length===0}
                          onClick={()=>placeOrder()}>Place Order</Button>
                      </ListGroupItem>
                  </ListGroup>
              </Card>
          </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
