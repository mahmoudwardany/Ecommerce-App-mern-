import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { toast } from "react-hot-toast";
import { useState } from "react";
const Register = () => {
  const nav = useNavigate();
const [loading,setLoading]=useState(true)
const [error,setError]=useState('')

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Min is 3 char")
      .max(15, "Max is 15 char")
      .required(" Name is required"),
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
      answer:Yup.string().min(3).max(16).required(),
    phone: Yup.string()
      .required()
      .matches(/^(010|011|012|015)[0-9]{8}$/, "Enter valid phone"),
      address:Yup.string().min(3).max(50).required(),
      
  });
  const formRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      address:"",
      phone: "",
    },
    onSubmit: (val) => {
      sentToApi(val);
    },
    validationSchema,
  });
  async function sentToApi(user) {
    try {
      const { data } = await axios.post(
        `https://ecomnode.onrender.com/api/v1/auth/register`,
        user
      ).catch((error)=>{setError(error.response.data?.message)
        setLoading(true)});
      if (data?.success) {
        toast.success(data?.message);
        nav("/login");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='form-container "'>
      <form className="my-3 w-75" onSubmit={formRegister.handleSubmit}>
        <h1 className="title">Register Now</h1>
        <label htmlFor="name">Name</label>
        <input
          onChange={formRegister.handleChange}
          type="text"
          name="name"
          id="name"
          className="form-control mb-3"
          onBlur={formRegister.handleBlur}
        />
        {formRegister.errors.name && formRegister.touched.name ? (
          <div className="text-danger my-2">{formRegister.errors.name}</div>
        ) : (
          ""
        )}
        <label htmlFor="email">Email</label>
        <input
          onChange={formRegister.handleChange}
          type="email"
          name="email"
          id="email"
          className="form-control mb-3"
          onBlur={formRegister.handleBlur}
        />
        {formRegister.errors.email && formRegister.touched.email ? (
          <div className="text-danger my-2">{formRegister.errors.email}</div>
        ) : (
          ""
        )}

        <label htmlFor="password">Password</label>
        <input
          onChange={formRegister.handleChange}
          type="password"
          name="password"
          id="password"
          className="form-control mb-3"
          onBlur={formRegister.handleBlur}
        />
        {formRegister.errors.password && formRegister.touched.password ? (
          <div className="text-danger my-2">{formRegister.errors.password}</div>
        ) : (
          ""
        )}
        <label htmlFor="phone">Phone</label>
        <input
          onChange={formRegister.handleChange}
          type="tel"
          name="phone"
          id="phone"
          className="form-control mb-3"
          onBlur={formRegister.handleBlur}
        />
        {formRegister.errors.phone && formRegister.touched.phone ? (
          <div className="text-danger">{formRegister.errors.phone}</div>
        ) : (
          ""
        )}
           <label htmlFor="address">Address</label>
        <input
          onChange={formRegister.handleChange}
          type="text"
          name="address"
          id="address"
          className="form-control mb-3"
          placeholder="Cairo.EG"
          onBlur={formRegister.handleBlur}
        />
        {formRegister.errors.address && formRegister.touched.address ? (
          <div className="text-danger">{formRegister.errors.address}</div>
        ) : (
          ""
        )}
         <label htmlFor="answer">Answer</label>
        <input
          onChange={formRegister.handleChange}
          type="text"
          name="answer"
          id="answer"
          className="form-control mb-3"
          placeholder="What's your Favorite sports"
          onBlur={formRegister.handleBlur}
        />
        {formRegister.errors.answer && formRegister.touched.answer ? (
          <div className="text-danger">{formRegister.errors.answer}</div>
        ) : (
          ""
        )}
        <Link to="/login" className="mx-3 text-center mx-auto">
          {" "}
          have an Account{" "}
        </Link>
        <br />
        <div className="text-center">
          <button
            disabled={!(formRegister.isValid && formRegister.dirty)}
            type="submit"
          >
            Register
          </button>
      {error?<div className='alert alert-danger'>{error}</div>:""}   

        </div>
      </form>
    </div>
  );
};

export default Register;
