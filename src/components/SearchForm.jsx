import Form from 'react-bootstrap/Form';
import { useSearch } from '../reducers/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const[values,setValues]=useSearch()
  const nav = useNavigate()
  
const handleSubmit=async(e)=>{
e.preventDefault()
try {
    const {data}=await axios.get(`https://ecomnode.onrender.com/api/v1/product/search/${values.keyword}`)

    setValues({...values,results:data})     
    nav('/search')
} catch (error) {
    console.log(error)
}
}
  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
    <Form.Control
      type="search"
      placeholder="Search"
      className="me-2"
      aria-label="Search"
      value={values.keyword}
      onChange={(e)=>setValues({...values,keyword:e.target.value})}
    />
  </Form>
  )
}

export default SearchForm