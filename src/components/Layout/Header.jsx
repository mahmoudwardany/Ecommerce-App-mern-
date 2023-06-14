import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../reducers/AuthContext";
import SearchForm from "../SearchForm";
import useCategory from "../../hooks/useCategory";
import {   Badge } from 'antd';
import { useSelector } from "react-redux";

const Header = () => {
  const[auth,setAuth]=useAuth()
  const cart=useSelector(state =>state.cart.cartitem)

  const categories=useCategory()
  const nav = useNavigate();
  const handleLogout = () => {
setAuth({
  ...auth,
  user:null,
  token:""
})
localStorage.removeItem('auth')
    nav("/login");
  };

 
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/" className="nav-link navbar-brand">
            Ecommerce-App
          </Link>
          <SearchForm/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
             
              {!auth.user ? (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                    to="/register"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink to={`/dashboard/${auth?.user.role ==='admin' ? "admin" : "user"}`} className="dropdown-item">
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropdown-item btn btn-danger"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "nav-link "
                }
                to="/cart"
              >
                 <Badge count={!auth.user ?"":cart?.length} >
      Cart
    </Badge>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
