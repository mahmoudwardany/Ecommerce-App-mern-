import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../components/Prices";
import { addtoCart } from '../../reducers/cart';
export const Home = () => {
  const [products, setProducts] = useState([]);
const dispatch=useDispatch()
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading,setLoading]=useState(false)
  const nav=useNavigate()
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://ecomnode.onrender.com/api/v1/category");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
   const fetchProducts = async()=>{
    try {
      setLoading(true)
      const {data} = await axios.get('https://ecomnode.onrender.com/api/v1/product/')
    if (data?.success) {
      setProducts(data?.products);
      setLoading(false)
    } 
  }catch (error) {
      console.log(error?.message)
    }
    
  }
  //
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) fetchProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("https://ecomnode.onrender.com/api/v1/product/filter-product/", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
    
<div className='container-fluid row '>
  <div className=' col-md-2 mt-2 ms-2 text-sm-center filters' >
    <h4>Filter By Category</h4>
    <div className="d-flex flex-column ">
            {categories?.map((c) => (
              <Checkbox
                key={c?.name}
                onChange={(e) => handleFilter(e.target.checked, c?._id)}
                className='text-sm-center mx-sm-auto'
              >
                {c?.name}
              </Checkbox>
            ))}
          </div>
          <h4 className=" mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p?._id}>
                  <Radio value={p?.array}>{p?.name}</Radio>
                </div>
              ))}
                  <button className='btn btn-danger mt-2'
                  onClick={()=>window.location.reload()  
                  }
                  >Reset Filter</button>

            </Radio.Group>
          </div>
  </div>
  <div className='col-md-8 text-center mt-2'>
    <h2>All Products</h2>
  <div className="d-flex flex-wrap h-25">
    {loading?<h3>Loading...</h3>:products?.map((p) => (
              <div key={p?._id} 
              className="card m-2" style={{ width: "18rem",height:"400px" }}>
                <img
                  src={`https://ecomnode.onrender.com/api/v1/product/get-photo/${p?._id}`}
                  className="card-img-top  h-50"
                  alt={p?.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                  <h5 className="card-title">{p?.name}</h5>
                  <p className="card-text">
                    {p?.description.substring(0, 30)}...
                  </p>
                  <p className="card-title card-price"> $ {p?.price}</p>
                  <button className="btn btn-primary ms-1" 
                  onClick={ ()=>  nav(`/product/${p?.slug}`) }
                  >More Details</button>
                      <button className='btn btn-success ms-2' onClick={()=> dispatch(addtoCart(p))}>
Add to Cart
                      </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
  </div>
</div>
</>
    )
}
