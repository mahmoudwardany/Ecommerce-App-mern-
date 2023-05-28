import { useEffect, useState } from 'react'
import AdminPanel from '../../components/AdminPanel'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../reducers/ProductsSlice'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Link } from 'react-router-dom';


const Products = () => {
  const {loading, products } = useSelector((state) => state.products)
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
 const dispatch=useDispatch()
 const validationSchema = Yup.object({
  name: Yup.string()
    .min(3)
    .required().max(25),
});
const updateFormik = useFormik({
  initialValues: {
    name: "",
  },
  onSubmit: (val) => {
    updateProducts(val);
  },
  validationSchema,
});
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData=async()=>{
   dispatch (fetchProducts())  
  }
  const handleDelete=async(id)=>{
    try {
       const {data}=await axios.delete(`https://ecomnode.onrender.com/api/v1/category/${id}`)    
       if(data.success){
      toast.success(`${data.message}`)
      fetchData()
    }
    } catch (error) {
      toast.success(`${error.message}`) 
    }
  }
 
  const updateProducts=async(cat)=>{
    try {
      const {data}=await axios.put(`http://localhost:5000/api/v1/category/update-category/${selected._id}`,cat)
  if(data.success){
    toast.success(`${data.products}`)
    setVisible(false)
    fetchData()
  }
    } catch (error) {
      console.log(error.message)
    }
    
    }
  
  return (
    <div className="row container-fluid mt-3">
    <div className="col-md-3 ">
      <AdminPanel />
    </div>
    <div className="col-md-9 col-sm-12">
      <h1 className="text-center">All Products List</h1>
      <div className="d-flex flex-wrap  text-sm-center">

{loading?<h3 className='text-center'>Loading....</h3>:products?.products?.map((p)=>(
  <div className='row m-2 ' key={p._id}>
    <div className='col-md-4  p-0 mx-sm-auto'>
    <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card mx-sm-auto text-sm-center" style={{ width: "15rem" }}>
                  <img
                    src={`https://ecomnode.onrender.com/api/v1/product/get-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name:{p.name}</h5>
                    <p className="card-text">Description:{p.description}</p>
                    <h6 className="card-text">Price: {p.price} $</h6>
                    <h6 className="card-text">Category: {p.category.name}</h6>


                  </div>
                </div>
              </Link>
              </div>
              </div>
))}
 </div>
        </div>
      </div>

  )
}

export default Products