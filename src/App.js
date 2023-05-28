import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './reducers/AuthContext';
import Dashboard from './pages/user/Dashboard';
import ForgotPassword from './pages/Forgot-password/Forgot-password';
import AdminDashboard from './pages/Admin/AdminDashboard';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import CreateCategory from './pages/Create-Category/Create-Category';
import CreateProducts from './pages/Create-Products/CreateProducts';
import ShowUsers from './pages/ShowUsers.jsx/ShowUsers';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import { SearchProvider } from './reducers/Search';
import SearchPage from './pages/Search/SearchPage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import CategoriesDetails from './pages/Categories/CategoriesDetails';
import Cart from './pages/Cart/Cart';
import { CartProvider } from './reducers/cart';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import OrdersAdmin from './pages/Admin/Orders';

function App() {
  let routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        //user
        { path: 'register', element: <Register /> },
        { path: 'dashboard/user', element:<PrivateRoute><Dashboard /></PrivateRoute>  },
        { path: 'dashboard/user/profile', element:<PrivateRoute><Profile /></PrivateRoute>  },
        { path: 'dashboard/user/orders', element:<PrivateRoute><Orders /></PrivateRoute>  },

        { path: "login", element: <Login /> },
        { path: "forgot-password", element: <ForgotPassword /> },

        //admin
        { path: 'dashboard/admin', element:<AdminRoute><AdminDashboard/></AdminRoute>  },
        { path: 'dashboard/admin/create-category', element:<AdminRoute><CreateCategory /></AdminRoute>  },
        { path: 'dashboard/admin/create-product', element:<AdminRoute><CreateProducts /></AdminRoute>  },
        { path: 'dashboard/admin/products', element:<AdminRoute><Products /></AdminRoute>  },
        { path: 'dashboard/admin/product/:slug', element:<AdminRoute><UpdateProduct /></AdminRoute>  },
        { path: 'dashboard/admin/users', element:<AdminRoute><ShowUsers /></AdminRoute>  },
        { path: 'dashboard/admin/orders', element:<AdminRoute><OrdersAdmin /></AdminRoute>  },


        { path: '/', element: <Home/> },
        { path: '/search', element: <SearchPage/> },
        { path: 'product/:slug', element: <ProductDetails/> },
        { path: 'category/:slug', element: <CategoriesDetails/> },
        { path: 'cart', element: <Cart/> },




        { path: 'contact', element: <Contact/> },
        { path: 'about', element: <About/> },
        { path: '*', element: <PageNotFound/> },
      ]
    }
  ])
  return (
    <AuthProvider >
      <SearchProvider>
         <RouterProvider router={routes} /> 
        
      </SearchProvider>
    </AuthProvider>
      
    

  );
}

export default App;
