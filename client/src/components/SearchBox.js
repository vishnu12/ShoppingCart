import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'

const SearchBox = ({history}) => {

    const [keyword, setKeyword] = useState('')

    const submit=e=>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }
  return (
    <Form onSubmit={submit} inline>
<Form.Control type='text' name='q'
onChange={e=>setKeyword(e.target.value)} 
placeholder='search products...'
className='mr-sm-2 ml-sm-5'>

</Form.Control>
<Button type='submit' variant='outline-success'
className='p-2'>
Search
</Button>
    </Form>
  )
}

export default SearchBox