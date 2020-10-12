import React,{useEffect} from 'react'
import { Button,Table } from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listUsers,deleteUser } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'



const UserListScreen = ({history}) => {

  const dispatch=useDispatch()  

  const userList=useSelector(state=>state.userList)
  const {error,loading,users}=userList

  const userLogin=useSelector(state=>state.userLogin)
  const {user}=userLogin

  const userDelete=useSelector(state=>state.userDelete)
  const {success:deleteSuccess}=userDelete

  useEffect(()=>{
      if(user && user.isAdmin){
        dispatch(listUsers())
      }else{
          history.push('/login')
      }
      
  },[dispatch,history,deleteSuccess,user])

  const deleteHandler=(id)=>{
      if(window.confirm('Are you sure')){
        dispatch(deleteUser(id))
      }
  }
 
  return (
    <>
     <h1>Users</h1> 
     {loading?<Loader /> :error ?<Message variant='danger'>{error}</Message>
     :
     (
         <Table striped bordered responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users && users.map(user=>{
                    return <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td>
                        {user.isAdmin?<i className='fas fa-check' style={{color:'green'}}></i>
                        :
                        <i className='fas fa-times' style={{color:'red'}}></i>
                        }
                    </td>
                    <td>
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                            </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                            <i className='fas fa-trash'></i>
                        </Button>
                    </td>
                    </tr>
                })}
            </tbody>
         </Table>
     )
    }
    </>
  )
}

export default UserListScreen
