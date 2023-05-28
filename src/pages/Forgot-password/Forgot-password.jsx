import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../reducers/AuthContext";
const ForgotPassword = () => {
    const nav = useNavigate();
    const[auth,setAuth]=useAuth()
    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),
        newPassword: Yup.string()
        .required("Password required")
        .min(8, "Must be 8 or more")
        .matches(
          /^[A-Z][a-zA-Z0-9!@$%^&*_-]{7,15}$/,
          "Must be started A-Z char and a-z or number char "
        )
        .max(15),
        answer:Yup.string().min(3).max(16).required()
    });
    const formLogin = useFormik({
      initialValues: {
        email: "",
        newPassword: "",
        answer:""
      },
      onSubmit: (val) => {
        sentToApi(val);
      },
      validationSchema,
    });
    async function sentToApi(user) {
      try {
        const { data } = await axios.post(
          `https://ecomnode.onrender.com/api/v1/auth/forgot-password`,
          user
        );
        if (data && data?.message === "Password Changed Successfully") {
          toast.success(data && data?.message);
          nav( "/login");
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
      <h1 className="title">Reset Password</h1>

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

      <label htmlFor="newPassword">New Password</label>
      <input
        onChange={formLogin.handleChange}
        type="password"
        name="newPassword"
        id="newPassword"
        className="form-control mb-3"
        onBlur={formLogin.handleBlur}
      />
      {formLogin.errors.newPassword && formLogin.touched.newPassword ? (
        <div className="text-danger my-2">{formLogin.errors.newPassword}</div>
      ) : (
        ""
      )}
        <label htmlFor="answer">Answer</label>
      <input
        onChange={formLogin.handleChange}
        type="text"
        name="answer"
        id="answer"
        className="form-control mb-3"
        onBlur={formLogin.handleBlur}
        placeholder="What's your Favorite sports"
      />
      {formLogin.errors.answer && formLogin.touched.answer ? (
        <div className="text-danger my-2">{formLogin.errors.answer}</div>
      ) : (
        ""
      )}
      <div className="text-center">
<button
          disabled={!(formLogin.isValid && formLogin.dirty)}
          type="submit"
        >
          Reset Password
        </button>
        </div> 
    </form>
  </div>
  )
}

export default ForgotPassword