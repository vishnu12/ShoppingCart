import React,{useState,useEffect} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const RegisterScreen = ({location,history}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const redirect=location.search?location.search.split('=')[1]:'/'

    const dispatch=useDispatch()
    const userRegister=useSelector(state=>state.userRegister)
    const {user,loading,error}=userRegister

    useEffect(()=>{
       if(user){
          history.push(redirect)
       }
    },[history,user,redirect])


    const submit=e=>{
        e.preventDefault()
        if(password !==confirmPassword){
          setMessage('Passwords do not match')
        }else{
         dispatch(register(name,email,password))
        }
        
    }

  return (
    <FormContainer>
        <h1>Sign Up</h1>
  {message && <Message variant='danger'>{message}</Message>}
  {error && <Message variant='danger'>{error}</Message>}
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
<Form.Label>Confirm Password</Form.Label>
<Form.Control type='password' placeholder='Enter Password to confirm'
value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
</Form.Group>
<Button type='submit' variant='primary'>
Register
</Button>
</Form> 
    <Row className='py-3'>
        <Col>
        Have an account?<Link to={redirect?`/login?redirect=${redirect}`:'/login'}>Login</Link>
        </Col>
    </Row>     
    </FormContainer>
  )
}

export default RegisterScreen
