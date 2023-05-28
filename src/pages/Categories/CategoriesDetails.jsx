import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addtoCart } from '../../reducers/cart'
import { useDispatch } from 'react-redux'

const CategoriesDetails = () => {
  const [products,setProducts]=useState([])
  const [category,setCategory]=useState({})
const dispatch=useDispatch()
const {slug}=useParams()
  const getProductByCategory=async()=>{
    try {
      const {data}=await axios.get(`https://ecomnode.onrender.com/api/v1/product/product-category/${slug}`)
    console.log(data)
    setProducts(data?.product)
    setCategory(data?.category)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
   if(slug) getProductByCategory()
  },[slug])
  return (
    <div className='container text-center mt-3'>
        <h2>Category- {category.name}</h2>
        <h5 className='text-danger'>{products.length} result found</h5>
        <div className="row">
          <div className='col-md-9 offset-1'>
            <h1>All Products</h1>
          <div className='d-flex flex-wrap'>
        {products?.map((p)=>(
 <div className=' container  col-md-4 mb-3' key={p._id}>
 
                <div key={p._id} className="card  text-sm-center" style={{ width: "16rem",height:"500px" }}>
                  <img
                    src={`https://ecomnode.onrender.com/api/v1/product/get-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name:{p.name}</h5>
                    <p className="card-text text-muted">Description:{p.description}</p>
                    <h6 className="card-text">Price: {p.price} $</h6>
                    <h6 className="card-text">Category: {p.category.name}</h6>
                    <button className="btn btn-secondary ms-1 "onClick={()=>dispatch(addtoCart(p))} >ADD TO CART</button>
                  </div>
                </div>
              
      </div>
        ))}
        </div>
        </div>
        </div>
    </div>
  )
}

export default CategoriesDetails