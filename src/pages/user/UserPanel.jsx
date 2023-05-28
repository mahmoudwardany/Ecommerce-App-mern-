import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
const UserPanel = () => {
  return (
    <div>
    <ListGroup>
      <ListGroup.Item>
        <NavLink    className={({ isActive }) =>
                  isActive ? "active2  nav-link" : "nav-link"
                }
                to='/dashboard/user/profile'
                >
                  Profile
  </NavLink>
      </ListGroup.Item>
  
  <ListGroup.Item>
    <NavLink to='/dashboard/user/orders'   className={({ isActive }) =>
                  isActive ? "active2  nav-link" : "nav-link"
                }>Orders</NavLink>
  </ListGroup.Item>
 
 
</ListGroup>
</div>
  )
}

export default UserPanel