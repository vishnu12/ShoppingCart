import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {listProductDetails,updateProduct} from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'


const ProductEditScreen = ({ match, history }) => {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
   


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {product,loading, error } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate, error:errorUpdate,success:successUpdate } = productUpdate


    useEffect(() => {
            if(successUpdate){
                dispatch({type:PRODUCT_UPDATE_RESET})
                history.push('/admin/productlist')
            }else{
               
                if(!product.name || product._id !==productId){
                    dispatch(listProductDetails(productId))
                }else{
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setCategory(product.category)
                    setStock(product.stock)
                    setBrand(product.brand)
                    setDescription(product.description)
                    }
            }

      
    }, [dispatch,history,productId,product,successUpdate,match])


    const uploadHandler=async e=>{
        const file=e.target.files[0]
        const formData=new FormData()
        formData.append('image',file)
        setUploading(true)
  
        try {
            const config={
                headers:{
                    'Content-type':'multipart/form-data'
                }
            }
  
            const {data}= await axios.post('/upload',formData,config)
            console.log(data)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error);
            setUploading(false)
        }
      }


    const submit = e => {
        e.preventDefault()
        dispatch(updateProduct({_id:productId,name,price,image,brand,category,stock,description}))
    }

    

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    :
                    (
                        <Form onSubmit={submit}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter Name'
                                    value={name} onChange={e => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='number' placeholder='Enter price'
                                    value={price} onChange={e => setPrice(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text' placeholder='Enter Image url'
                                    value={image} onChange={e => setImage(e.target.value)} />
                            </Form.Group>
                            <Form.File id='image-file' label='choose file' custom
                            onChange={uploadHandler}></Form.File>

                            {uploading && <Loader />}
                            
                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type='text' placeholder='Enter brand'
                                    value={brand} onChange={e => setBrand(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control type='text' placeholder='Enter category'
                                    value={category} onChange={e => setCategory(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId='stock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type='number' placeholder='Enter stock'
                                    value={stock} onChange={e => setStock(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type='text' placeholder='Enter description'
                                    value={description} onChange={e => setDescription(e.target.value)} />
                            </Form.Group>
                            <Button type='submit' variant='primary'>
                                Update
</Button>
                        </Form>
                    )
                }


            </FormContainer>
        </>

    )
}

export default ProductEditScreen
