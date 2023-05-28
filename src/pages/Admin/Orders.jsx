import { useEffect, useState } from 'react';
import AdminPanel from '../../components/AdminPanel'
import UserPanel from '../user/UserPanel';
import { useAuth } from '../../reducers/AuthContext';
import axios from 'axios';
import moment from 'moment';
import { Select } from 'antd';
const { Option } = Select;

const OrdersAdmin = () => {
  const [orders,setOrders]=useState([])
  const [status,setStatus]=useState(["Not proccess","Processing","Shipped","deliverd","cancel"])
  const [auth]=useAuth()
  const getOrders=async()=>{
    const {data} = await axios.get("https://ecomnode.onrender.com/api/v1/user/all-orders")
setOrders(data?.orders)
  }
  useEffect(()=>{
  if(auth?.token) getOrders()
  },[auth?.token])

  const handleChange=async(orderId,value)=>{
    const {data}= await axios.put(`http://localhost:5000/api/v1/user/update-status/${orderId}`,{
      status:value
    })
    getOrders()
  }
  return (
    <div className="container-flui p-3 m-3 dashboard">
    <div className="row">
      <div className="col-md-3">
        <AdminPanel />
      </div>
      <div className="col-md-9">
        <h1 className="text-center">Mange Orders</h1>
        {orders?.map((o, i) => {
          return (
            <div className="border shadow" key={i}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col"> date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <Select bordered={false} defaultValue={o?.status}
                      onChange={(value)=>handleChange(o._id,value)}
                      >
                        {status.map((s,i)=>(
                          <Option value={s} key={i}>{s}</Option>
                        )
                        )}
                      </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createAt).fromNow()}</td>
                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                {o?.products?.map((p, i) => (
                  <div className="row mb-2 p-3 card flex-row" key={i}>
                    <div className="col-md-4">
                      <img
                        src={`http://localhost:5000/api/v1/product/get-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="100px"
                        height={"100px"}
                      />
                    </div>
                    <div className="col-md-8">
                      <p>{p.name}</p>
                      <p>{p.description.substring(0, 30)}</p>
                      <p>Price : {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  )
}

export default OrdersAdmin