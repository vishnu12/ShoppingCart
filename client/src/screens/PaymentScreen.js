import React,{useState} from 'react'
import { Button,Col,Form} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {savePaymentMethod} from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'


const PaymentScreen = ({history}) => {


    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cart)
    const {shippingAddress} =cart

    if(!shippingAddress){
        history.push('/shipping')
        
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    

    const submit=e=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submit}>
        <Form.Group>
            <Form.Label as='legend'>select method</Form.Label>
       
        <Col>
        <Form.Check type='radio' label='PayPal or Credit card'
        id='PayPal' name='paymentMethod' value='PayPal'
        checked onChange={e=>setPaymentMethod(e.target.value)}>
        </Form.Check>
        <Form.Check type='radio' label='Stripe'
        id='Stripe' name='paymentMethod' value='Stripe'
        checked onChange={e=>setPaymentMethod(e.target.value)}>
        </Form.Check>
        </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
            Continue
        </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
