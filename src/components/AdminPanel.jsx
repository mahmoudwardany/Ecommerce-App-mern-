import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div>
        <ListGroup>
          <ListGroup.Item>
            <NavLink    className={({ isActive }) =>
                      isActive ? "active2  nav-link" : "nav-link"
                    }
                    to='/dashboard/admin/create-category'
                    >
                      Create Category
      </NavLink>
          </ListGroup.Item>
      
      <ListGroup.Item>
        <NavLink to='/dashboard/admin/create-product'   className={({ isActive }) =>
                      isActive ? "active2  nav-link" : "nav-link"
                    }>Create Product</NavLink>
      </ListGroup.Item>
      <ListGroup.Item>
        <NavLink to='/dashboard/admin/products'   className={({ isActive }) =>
                      isActive ? "active2  nav-link" : "nav-link"
                    }>All products</NavLink>
      </ListGroup.Item>
      <ListGroup.Item>
        <NavLink to='/dashboard/admin/users'   className={({ isActive }) =>
                      isActive ? "active2  nav-link" : "nav-link"
                    }>Users</NavLink>
      </ListGroup.Item>
      <ListGroup.Item>
        <NavLink to='/dashboard/admin/orders'   className={({ isActive }) =>
                      isActive ? "active2  nav-link" : "nav-link"
                    }>Orders</NavLink>
      </ListGroup.Item>
     
    </ListGroup>
    </div>
  )
}

export default AdminPanel