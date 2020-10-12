import React,{useState} from 'react'
import { Button,Form} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {saveShippingAddress} from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'


const ShippingScreen = ({history}) => {


    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cart)
    const {shippingAddress} =cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submit=e=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submit}>
        <Form.Group controlId='address'>
        <Form.Label>Address</Form.Label>
        <Form.Control type='text' placeholder='Enter Address'
         value={address} onChange={e=>setAddress(e.target.value)} required/>
        </Form.Group>
        <Form.Group controlId='city'>
        <Form.Label>City</Form.Label>
        <Form.Control type='text' placeholder='Enter City'
         value={city} onChange={e=>setCity(e.target.value)} required/>
        </Form.Group>
        <Form.Group controlId='postalcode'>
        <Form.Label>Postalcode</Form.Label>
        <Form.Control type='text' placeholder='Enter Postalcode'
         value={postalCode} onChange={e=>setPostalCode(e.target.value)} required/>
        </Form.Group>
        <Form.Group controlId='country'>
        <Form.Label>country</Form.Label>
        <Form.Control type='text' placeholder='Enter Country'
         value={country} onChange={e=>setCountry(e.target.value)} required/>
        </Form.Group>
        <Button type='submit' variant='primary'>
            Continue
        </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
