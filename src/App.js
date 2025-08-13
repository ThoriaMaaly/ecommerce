import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/home';
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Components/Layout/layout';
import Register from './Components/Register/register';
import Login from './Components/Login/login';
import Products from './Components/Products/products';
import Productdetails from './Components/Product details/productdetails';
import ProtectedRoutes from './Components/Protected Routes/protected routes';
import Categeories from './Components/categeories/categeories';
import Usercontext from './context/usercontext';
import Cartcontext from './context/cartcontext';
import Cart from './Components/cart/cart';
import ShippingAddress from './Components/Adress/shippingAddress';
import Wishlist from './Components/WishList/wishlist';
import Allorders from './Components/orders/allorders';
import Profile from './Components/Profile/profile';
import Notfound from './Components/Not Found/Notfound';
const router = createHashRouter([{
  path: '/', element: <Layout />, children: [
    { index: true, element: <Home /> }
    , {
      path: "/register", element: <Register />
    }
    , {
      path: "/login", element: <Login />
    }
    , {
      path: "/profile", element: <Profile />
    }
    , {
      path: "/products", element: <ProtectedRoutes><Products /></ProtectedRoutes>
    }
    , {
      path: "/productdetails/:id", element: <ProtectedRoutes><Productdetails /></ProtectedRoutes>
    }
    , {
      path: "/categories", element: <ProtectedRoutes><Categeories /></ProtectedRoutes>
    }
    , {
      path: "/cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes>
    }
    , {
      path: "/shippingAddress", element: <ProtectedRoutes><ShippingAddress /></ProtectedRoutes>
    }
    , {
      path: "/allorders", element: <ProtectedRoutes> <Allorders></Allorders></ProtectedRoutes>
    }
    , {
      path: "/wishlist", element: <ProtectedRoutes> <Wishlist></Wishlist> </ProtectedRoutes>
    },{
      path:'*',element:<Notfound/>
    }

  ]
}])
function App() {
  return (<>

    <Usercontext>
      <Cartcontext>
        <RouterProvider router={router}>

        </RouterProvider>
      </Cartcontext>

    </Usercontext>
   

  </>

  );
}

export default App;
