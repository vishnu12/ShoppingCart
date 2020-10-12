import React, { useEffect } from 'react'
import { Col, ListGroup, Row, Image,Button,ListGroupItem,Form, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemsToCart,removeItemsFromCart } from '../actions/cartActions'
import Message from '../components/Message'

const CartScreen = ({ match, location, history }) => {

    const prodId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    useEffect(() => {
        prodId && dispatch(addItemsToCart(prodId, qty))
    }, [dispatch, prodId, qty])


    const removeFromCart=(id)=>{
        dispatch(removeItemsFromCart(id))
    }

    const checkout=()=>{
       history.push('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ? <Message>Your cart is empty
              <Link to='/' className='ml-3'>Go back</Link>
                    </Message> : (
                            <ListGroup variant='flush'>
                                {cartItems.map(item => {
                                    return <ListGroupItem key={item.id}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.id}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>$ {item.price}</Col>
                                            <Col md={2}>
                                                <Form.Control as='select'
                                                    value={item.qty}
                                                    onChange={e => dispatch(addItemsToCart(item.id,Number(e.target.value)))}>
                                                    {
                                                        [...Array(item.stock).keys()].map(k => (
                                                            <option key={k + 1} value={k + 1}>{k + 1}</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button type='button' variant='light' onClick={()=>removeFromCart(item.id)}>
                                                       <i className='fas fa-trash'/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                })}
                            </ListGroup>
                        )
                }
            </Col>
            <Col md={4}>
         <Card>
             <ListGroup variant='flush'>
                 <ListGroupItem>
                     <h2>Sub Total ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h2>
                     $ {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                 </ListGroupItem>
                 <ListGroupItem>
                     <Button type='button' className='btn-block'
                     disabled={cartItems.length===0} onClick={checkout}>Checkout</Button>
                 </ListGroupItem>
             </ListGroup>
         </Card>
            </Col>
        </Row>
    )
}

export default CartScreen


