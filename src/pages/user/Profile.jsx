import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuth } from "../../reducers/AuthContext";
import UserPanel from "./UserPanel";
const Profile = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, password, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setPassword(password);
    setEmail(email);
    setAddress(address);
  }, []);
  async function sentToApi(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://ecomnode.onrender.com/api/v1/auth/update-profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(data?.message);
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      toast.error(error?.response);
    }
  }
  return (
    <div className="container-fluid text-center">
      <div className="row g-3">
        <h2 className="mt-4">User Dashboard</h2>

        <div className="col-md-3 col-sm-12  p-3">
          <UserPanel />
        </div>
        <div className="form-container  col-md-8 col-sm-12">
          <form className="my-3 w-75" onSubmit={sentToApi}>
            <h1 className="title">Update Profile</h1>
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              className="form-control mb-3"
            />
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="form-control mb-3"
              disabled
            />

            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              className="form-control mb-3"
            />
            <label htmlFor="phone">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              name="phone"
              id="phone"
              className="form-control mb-3"
            />
            <br />
            <label htmlFor="address">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="address"
              id="address"
              className="form-control mb-3"
            />
            <br />
            <div className="text-center">
              <button type="submit">Update Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
