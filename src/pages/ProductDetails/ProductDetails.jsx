import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addtoCart } from "../../reducers/cart";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarproduct, setSimilarProduct] = useState([]);
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    if (params?.slug) fetchProductDetails();
  }, [params?.slug]);
  const fetchProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://ecomnode.onrender.com/api/v1/product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/related-product/${pid}/${cid}`
      );
      setSimilarProduct(data?.product);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="row container mt-4">
      <div className="col-md-6 text-center mx-auto">
        <img
          src={`http://localhost:5000/api/v1/product/get-photo/${product?._id}`}
          alt={product?.name}
          height="300"
          width={"350px"}
        />
      </div>
      <div className="col-md-6 text-center mt-3">
        <h2>Product Details</h2>
        <h3>Name: {product?.name}</h3>
        <h3 className="text-muted">Description: {product?.description}</h3>
        <h3>Price: {product?.price}$</h3>
        <h3>Category: {product?.category?.name}</h3>
        <button
          className="btn btn-secondary ms-1"
          onClick={() => dispatch(addtoCart(product))}
        >
          ADD TO CART
        </button>
        <button className="btn btn-success ms-1" onClick={() => nav(`/`)}>
          Back To Shopping
        </button>
      </div>
      <div className="row">
        <div className="col-md-9 offset-1 mt-3">
          <h3 className="text-center mt-5">Similar Products</h3>
          <div className="d-flex flex-wrap">
            {similarproduct?.map((p) => (
              <div className=" container  col-md-4 mb-3" key={p?._id}>
                <div
                  key={p?._id}
                  className="card mx-sm-auto text-sm-center"
                  style={{ width: "18rem", height: "550px" }}
                >
                  <img
                    src={`http://localhost:5000/api/v1/product/get-photo/${p?._id}`}
                    className="card-img-top "
                    alt={p?.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name:{p?.name}</h5>
                    <p className="card-text text-muted">
                      Description:{p?.description}
                    </p>
                    <h6 className="card-text">Price: {p?.price} $</h6>
                    <h6 className="card-text">Category: {p?.category?.name}</h6>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => dispatch(addtoCart(product))}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
