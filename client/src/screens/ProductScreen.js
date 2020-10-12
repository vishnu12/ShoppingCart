import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form,Col, Row, Image, ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { listProductDetails,createProductReview } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'
import Meta from '../components/Meta'


const ProductScreen = ({ match,history }) => {

    const prodId = match.params.id

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')



    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin

    const productCreateReview = useSelector(state => state.productCreateReview)
    const {error:errorCreateReview,success:successCreateReview } = productCreateReview

    const dispatch = useDispatch()


    useEffect(() => {
        if(successCreateReview){
            alert('Review submitted')
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(prodId))
    }, [dispatch,match,prodId,successCreateReview])


    const addToCart=()=>{
       history.push(`/cart/${prodId}?qty=${qty}`)
    }

    const submit=(e)=>{
       e.preventDefault()
       dispatch(createProductReview(prodId,{rating,comment}))
    }


    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
    </Link>
            {loading ? <Loader /> : error ? <Message>{error}</Message> :
               <>
               <Meta title={product.name}/>
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroupItem>
                            <ListGroupItem>
                                Price : ${product.price}
                            </ListGroupItem>
                            <ListGroupItem>
                                Description : {product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Price
    </Col>
                                        <Col>
                                            <strong>$ {product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Status
    </Col>
                                        <Col>
                                            {product.stock > 0 ? 'In stock' : 'Out of stock'}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                {product.stock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                            <Form.Control as='select'
                                            value={qty}
                                            onChange={e=>setQty(e.target.value)}>
                                             {
                                                 [...Array(product.stock).keys()].map(k=>(
                                                    <option key={k+1} value={k+1}>{k+1}</option>
                                                 ))
                                             }
                                            </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}
                                <ListGroupItem>
                                    <Button className='btn-block' type='button'
                                        disabled={product.stock === 0}
                                        onClick={addToCart}>
                                        Add to Cart
</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews && product.reviews.length===0 && <Message>No Reviews</Message>}
                    <ListGroup variant='flush'>
                   {product.reviews && product.reviews.map((review,k)=>{
                       return <ListGroupItem key={k}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}/>
                   <p>{review.createdAt.substring(0,10)}</p>
                   <p>{review.comment}</p>
                       </ListGroupItem>
                   })}
                   <ListGroupItem>
                       <h2>Write a review</h2>
                {errorCreateReview && <Message variant='danger'>{errorCreateReview}</Message>}
                       {user?
                       (<Form onSubmit={submit}>
                        <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as='select' value={rating} 
                      onChange={e=>setRating(e.target.value)}>
                    <option value=''>select...</option>
                    <option value='1'>1 -Poor</option>
                    <option value='2'>2 -Fair</option>
                    <option value='3'>3 -Good</option>
                    <option value='4'>4 -Very good</option>
                    <option value='5'>5 -Excellent</option>
                      </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                       <Form.Label>Comment</Form.Label>
                       <Form.Control as='textarea' rows='3' value={comment}
                       onChange={e=>setComment(e.target.value)}>

                       </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Submit
                        </Button>
                       </Form>)
                       : 
                       (<Message>Please <Link to='/login'>login</Link> to write a review</Message>)}
                   </ListGroupItem>
                    </ListGroup>
                </Col>
                </Row>
                </>
            }
        </>
    )
}

export default ProductScreen
