import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title,description,keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}/>
      <meta name='keywords' content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps={
    title:'Welcome to Myshop',
    keywords:'electronics,clothes,buy at cheap rates',
    description:'We sell quality products'
}

export default Meta
