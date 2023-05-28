import React from 'react'
import { useSearch } from '../../reducers/Search'

const SearchPage = () => {
  const[values,setValues]=useSearch()

  return (
    <div className='container text-center mt-4'>
        <h1 className='h3 text-muted'>Search Page</h1>
        <h6 className='text-danger fw-bolder'>{values?.results?.length <1 ? "Not Products Found": `We found ${values?.results?.length} Result`}</h6>
        <div className="d-flex flex-wrap h-25">
{values?.results?.map((p) => (
              <div key={p._id} 
              className="card m-2" style={{ width: "18rem",height:"400px" }}>
                <img
                  src={`https://ecomnode.onrender.com/api/v1/product/get-photo/${p._id}`}
                  className="card-img-top img-thumbnail h-50"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-success ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
            </div>
    </div>
  )
}

export default SearchPage