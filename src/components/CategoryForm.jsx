import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";

const CategoryForm = ({ fetchData }) => {
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().min(3).required().max(25),
  });
  const AddCategory = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (val) => {
      sentApi(val);
    },
    validationSchema,
  });
  const sentApi = async (cat) => {
    const { data } = await axios.post(
      "https://ecomnode.onrender.com/api/v1/category/create-category",
      cat
    );
    if (data?.success) {
      toast.success(`${data.category.name}`);
      fetchData();
    } else {
      toast.error(data && data.message);
    }
  };

  return (
    <div className="text-center mx-sm-auto">
      <form className="my-3 w-75 mx-auto" onSubmit={AddCategory.handleSubmit}>
        {error ? <div className="alert alert-danger">{error}</div> : ""}

        <input
          onChange={AddCategory.handleChange}
          type="text"
          name="name"
          id="name"
          className="form-control mb-3"
          onBlur={AddCategory.handleBlur}
          placeholder="Category Name"
        />
        <button className="btn btn-success">Add Category</button>
      </form>
    </div>
  );
};

export default CategoryForm;
