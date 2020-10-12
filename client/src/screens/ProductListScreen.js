import React,{useEffect} from 'react'
import { Button,Table,Row,Col } from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listProducts,deleteProduct,createProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'



const ProductListScreen = ({history,match}) => {

  const pageNumber=match.params.pageNumber || 1  

  const dispatch=useDispatch()  

  const productList=useSelector(state=>state.productList)
  const {error,loading,products,pages,page}=productList

  const productDelete=useSelector(state=>state.productDelete)
  const {error:errorDelete,loading:loadingDelete,success:successDelete}=productDelete

  const productCreate=useSelector(state=>state.productCreate)
  const {error:errorCreate,loading:loadingCreate,product:createdProduct,success:successCreate}=productCreate

  const userLogin=useSelector(state=>state.userLogin)
  const {user}=userLogin


  useEffect(()=>{
      dispatch({type:PRODUCT_CREATE_RESET})
      if(!user.isAdmin){
        history.push('/login')
      }else if(successCreate){
        history.push(`/admin/product/${createdProduct._id}/edit`)
      }else{
          dispatch(listProducts('',pageNumber))
      }
      
  },[dispatch,
    history,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
    user
])

  const createProductHandler=(product)=>{
      dispatch(createProduct())
  }

  const deleteHandler=(id)=>{
      if(window.confirm('Are you sure')){
       dispatch(deleteProduct(id))
      }
  }
 
  return (
    <>
    <Row className='align-items-center'>
     <Col>
     <h1>Products</h1>
     </Col>
     <Col className='text-right'>
         <Button className='my-3' onClick={()=>createProductHandler()}>
<i className='fas fa-plus'></i> Create Product
         </Button>
     </Col>
    </Row>
     {loadingDelete && <Loader />}
     {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
     {loadingCreate && <Loader />}
     {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

     {loading?<Loader /> :error ?<Message variant='danger'>{error}</Message>

     :
     (
         <>
         <Table striped bordered responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products && products.map(product=>{
                    return <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                        {user.isAdmin?<i className='fas fa-check' style={{color:'green'}}></i>
                        :
                        <i className='fas fa-times' style={{color:'red'}}></i>
                        }
                    </td>
                    <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                            </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                            <i className='fas fa-trash'></i>
                        </Button>
                    </td>
                    </tr>
                })}
            </tbody>
         </Table>
         <Paginate pages={pages} page={page} isAdmin={true}/>
         </>
     )
    }
    </>
  )
}

export default ProductListScreen
