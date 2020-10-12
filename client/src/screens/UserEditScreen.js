import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetail,updateUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {USER_UPDATE_RESET} from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {userInfo,loading, error } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate, error:errorUpdate,success:successUpdate } = userUpdate

    useEffect(() => {

        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else{
            if(!userInfo.name || userInfo._id !==userId){
                dispatch(getUserDetail(userId))
            }else{
                setName(userInfo.name)
                setEmail(userInfo.email)
                setIsAdmin(userInfo.isAdmin)
            }
        }
      
    }, [dispatch,history,userId,userInfo,successUpdate])


    const submit = e => {
        e.preventDefault()
        dispatch(updateUser({
            _id:userId,
            name,
            email,
            isAdmin
        }))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go back</Link>
            <FormContainer>
                <h1>Edit User</h1>
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
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Enter Email'
                                    value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='isadmin'>
                                <Form.Check type='checkbox' label='Is Admin'
                                    checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
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

export default UserEditScreen
