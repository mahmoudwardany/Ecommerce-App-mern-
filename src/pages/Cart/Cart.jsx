import React, { useEffect, useState } from 'react'
import { ClearCart, addtoCart, descressQuantity, removeFromCart, useCart } from '../../reducers/cart'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../reducers/AuthContext';
import axios from 'axios';
import DropIn from "braintree-web-drop-in-react";
import {toast} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const [auth] = useAuth();
  const [clientToken,setClientToken]=useState('')
  const [instance, setInstance] = useState("");
  const [loading,setLoading]=useState(false)
  const cart=useSelector(state => state.cart.cartitem)
const dispatch=useDispatch()
  const navigate = useNavigate();
  //total
  const totalPrice=cart.reduce((acc,product)=>{
    acc +=product.price * product.cartQuantity
  return acc
  },0)
  const getTokenApi=async()=>{
    let {data}=await axios.get(`https://ecomnode.onrender.com/api/v1/product/braintree/token`)
    setClientToken(data?.clientToken)
  }
  //payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("https://ecomnode.onrender.com/api/v1/product/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cartitem");
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(()=>{
    getTokenApi()
  },[auth?.token])
  const handleDescred=(product)=>{
    dispatch(descressQuantity(product))
    }
  return (
    <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h1 className="text-center bg-light p-2 mb-1">
          {`Hello ${auth?.token && auth?.user?.name}`}
        </h1>
        <h4 className="text-center">
          {cart?.length
            ? `You Have ${cart.length} items in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : " Your Cart Is Empty"}
        </h4>
      </div>
    </div>
    <div className="row">
      <div className="col-md-8">
        {cart?.map((p) => (
          <div className="row mb-2 p-3 card flex-row" key={p._id}>
            <div className="col-md-4">
              <img
                src={`https://ecomnode.onrender.com/api/v1/product/get-photo/${p._id}`}
                className="card-img-top img-responsive"
                alt={p.name}
                width="100px"
                height={"100px"}
              />
            </div>
            <div className="col-md-8 text-sm-center mx-sm-auto">
              <p>{p.name}</p>
              <p>{p.description.substring(0, 30)}</p>
              <p>Price : {p.price}</p>
              <p>Quantity : {p.cartQuantity}</p>
              <button className='btn btn-light' onClick={()=> handleDescred(p)}>-</button>
              <button
                className="btn btn-danger mx-3"
                onClick={() => dispatch(removeFromCart(p))}
              >
                Remove
              </button>
              <button className='btn btn-warning '
              onClick={()=>dispatch(addtoCart(p))}
              >+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="col-md-4 text-center">
        <h2>Cart Summary</h2>
        <button className='btn btn-dark' onClick={()=>dispatch(ClearCart())}>Clear Cart</button>
        <p>Total | Checkout | Payment</p>
        <hr />
        <h4>Total : {totalPrice} $ </h4>
        {auth?.user?.address ? (
          <>
            <div className="mb-3">
              <h4>Current Address</h4>
              <h5>{auth?.user?.address}</h5>
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            </div>
          </>
        ) : (
          <div className="mb-3">
            {auth?.token ? (
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            ) : (
              <button
                className="btn btn-outline-warning"
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Plase Login to checkout
              </button>
            )}
          </div>
        )}
                    {!clientToken || cart?.length <1 ? (
                ""
              ) : (
                <div className='my-2'>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </div>
              )}

        
      </div>
    </div>
  </div>
  )
}

export default Cart