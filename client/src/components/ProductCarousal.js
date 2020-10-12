import React,{useEffect} from 'react'
import { Carousel,Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopRatedProducts } from '../actions/productActions'
import Loader from './Loader'
import Message from './Message'



const ProductCarousal = () => {

 const dispatch=useDispatch()

 const productTopRated=useSelector(state=>state.productTopRated)
 const {products,error,loading} =productTopRated

useEffect(() => {
   dispatch(listTopRatedProducts())
}, [dispatch])

  return loading?<Loader />
:error?<Message variant='danger'>{error}</Message>
:
<Carousel pause='hover' className='bg-dark'>
{products.map(product=>{
    return <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid/>
                <Carousel.Caption className='carousal-caption'>
                <h2>{product.name} (${product.price})</h2>
                </Carousel.Caption>
            </Link>
           </Carousel.Item>
})}
</Carousel>
}

export default ProductCarousal
