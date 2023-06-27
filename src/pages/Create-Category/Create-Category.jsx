import { useEffect, useState } from "react";
import AdminPanel from "../../components/AdminPanel";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../reducers/categorySlice";
import Table from "react-bootstrap/Table";
import CategoryForm from "../../components/CategoryForm";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal } from "antd";

const CreateCategory = () => {
  const { loading, category } = useSelector((state) => state.category);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    name: Yup.string().min(3).required().max(25),
  });
  const updateFormik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (val) => {
      updateCategory(val);
    },
    validationSchema,
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(fetchCategory());
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://ecomnode.onrender.com/api/v1/category/${id}`
      );
      if (data.success) {
        toast.success(`${data.message}`);
        fetchData();
      }
    } catch (error) {
      toast.success(`${error.message}`);
    }
  };

  const updateCategory = async (cat) => {
    try {
      const { data } = await axios.put(
        `https://ecomnode.onrender.com/api/v1/category/update-category/${selected._id}`,
        cat
      );
      if (data.success) {
        toast.success(`${data?.category.name}`);
        setVisible(false);
        fetchData();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container-fluid text-center">
      <div className="row ">
        <div className="col-md-3  p-3 col-sm-12 ">
          <AdminPanel />
        </div>
        <div className="col-md-9 col-sm-12 text-center mx-auto m-3 p-3 ">
          <h1>Mange Category</h1>
          <CategoryForm fetchData={fetchData} />

          {loading ? (
            <h3>Loading....</h3>
          ) : (
            category?.categories?.map((cat, i) => (
              <>
                <Table
                  key={cat?._id}
                  striped
                  bordered
                  hover
                  variant="dark"
                  className="text-center mx-sm-auto col-sm-12"
                >
                  <thead>
                    <tr>
                      <th scope="col"> Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="w-50">{cat?.name}</td>
                      <td className="w-50">
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(cat?._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setSelected(cat);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
            ))
          )}
        </div>
      </div>
      <>
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <form
            className="my-3 w-75"
            id="updateForm"
            onSubmit={updateFormik.handleSubmit}
          >
            <label htmlFor="name">Category Name</label>
            <input
              onChange={updateFormik.handleChange}
              type="text"
              name="name"
              id="name"
              className="form-control mb-3"
              onBlur={updateFormik.handleBlur}
            />
            <button className="btn btn-success">Update Category</button>
          </form>
        </Modal>
      </>
    </div>
  );
};

export default CreateCategory;
