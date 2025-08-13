import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../Assets/Images/freshcart-logo.svg"
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min"
import '@fortawesome/fontawesome-free/css/all.min.css'
import { usercontext } from '../../context/usercontext'

function Navbar() {

  let { userToken, setUserToken, userInformation, setUserInformation } = React.useContext(usercontext)



  function logout() {

    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    setUserToken(null);
    setUserInformation(null);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <img src={logo} alt="logo fresh cart" />

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart <i className="fa-solid fa-cart-shopping"></i> </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">Categeories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">  Wish List <i className="fa-solid fa-heart fa-xl text-danger "> </i> </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex justify-content-evenly align-items-center">


                <Link to='https://www.instagram.com/'> <i className="fa-brands fa-instagram maincolor me-2"></i></Link>
                <Link to='https://www.facebook.com/'>   <i className="fa-brands fa-facebook maincolor me-2"></i> </Link>
                <Link to='https://www.tiktok.com/'> <i className="fa-brands fa-tiktok maincolor me-2"></i></Link>
                <Link to='https://www.twitter.com/'> <i className="fa-brands fa-twitter maincolor me-2"></i> </Link>
                <Link to='https://www.linkedin.com/'><i className="fa-brands fa-linkedin maincolor me-2"></i></Link>
                <Link to='https://www.yotube.com/'><i className="fa-brands fa-yotube maincolor me-2"></i></Link>


              </li>

              {localStorage.getItem('userToken') ? <>
                
                <li className="nav-item">
                  <span className="nav-link active" aria-current="page" onClick={logout}>Logout</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile"><i class="fa-solid fa-user"></i></Link>
                </li></>
              
               : <>
                
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li></>
              }



            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar
