import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../reducers/AuthContext";
import { useState } from "react";
const Login = () => {
  const nav = useNavigate();
  const[auth,setAuth]=useAuth()
const location=useLocation()
const [loading,setLoading]=useState(true)

const [error,setError]=useState('')
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password required")
      .min(8, "Must be 8 or more")
      .matches(
        /^[A-Z][a-zA-Z0-9!@$%^&*_-]{7,15}$/,
        "Must be started A-Z char and a-z or number char "
      )
      .max(15),
  });
  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (val) => {
      sentToApi(val);
    },
    validationSchema,
  });
  async function sentToApi(user) {
    try {
      const { data } = await axios.post(
        `https://ecomnode.onrender.com/api/v1/auth/login`,
        user
      ).catch((error)=>{setError(error.response.data?.message)
      setLoading(true)});
      setLoading(true)

      if (data && data?.message === "Login Successful") {
        toast.success(data && data?.message);
        setLoading(true)
console.log(data)
        setAuth({
          ...auth,
          user:data.user,
          token:data.token
        })
        localStorage.setItem('auth',JSON.stringify(data))
        nav(location.state || "/");
      } else {
        toast.error(data && data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  return (
    <div className='form-container "'>
      <form className="my-3 w-75" onSubmit={formLogin.handleSubmit}>
      {error?<div className='alert alert-danger'>{error}</div>:""}   
        <h1 className="title">Login Now</h1>

        <label htmlFor="email">Email</label>
        <input
          onChange={formLogin.handleChange}
          type="email"
          name="email"
          id="email"
          className="form-control mb-3"
          onBlur={formLogin.handleBlur}
        />
        {formLogin.errors.email && formLogin.touched.email ? (
          <div className="text-danger my-2">{formLogin.errors.email}</div>
        ) : (
          ""
        )}

        <label htmlFor="password">Password</label>
        <input
          onChange={formLogin.handleChange}
          type="password"
          name="password"
          id="password"
          className="form-control mb-3"
          onBlur={formLogin.handleBlur}
        />
        {formLogin.errors.password && formLogin.touched.password ? (
          <div className="text-danger my-2">{formLogin.errors.password}</div>
        ) : (
          ""
        )}
        <div className="text-center">
        <Link to="/register" className="mx-3 text-center mx-auto">
          Don't have an Account{" "}
        </Link>
              <br/>
 <Link className="" onClick={()=>nav('/forgot-password')}>Forgot Password</Link>
 <br/>
 {loading ? <button disabled={!(formLogin.isValid && formLogin.dirty)} type='submit'>Login</button>:<i className='fas fa-spinner fa-spin bg-main'></i>}
          </div> 
      </form>
    </div>
  );
};

export default Login;
