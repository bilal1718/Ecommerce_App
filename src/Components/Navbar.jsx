import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faFlag, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import logo from "../Images/download.webp";
import "../Styles/navbar.css"
import "bootstrap/dist/css/bootstrap.min.css";


export default function Navbar({ cartCount }) {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img id="AmazonLogo" src={logo} alt="Amazon Logo" draggable="false" height="30" />
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          

          <form className="d-flex align-items-center w-100 form-search">
            <div className="input-group">
              <button className="btn btn-light dropdown-toggle shadow-0" type="button" data-bs-toggle="dropdown"
                aria-expanded="false" style={{ paddingBottom: "0.4rem" }}>
                All
              </button>
              <ul className="dropdown-menu dropdown-menu-dark fa-ul">
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </div>
          </form>
          <ul className="navbar-nav ms-auto mb-2">
            <li className="nav-item me-3">
              <Link to="/form" className="nav-link d-flex align-items-center">
                Sign Up
              </Link>
            </li>
            
            <li className="nav-item" style={{ width: "45px" }}>
              <Link className="nav-link d-flex align-items-center" to="/cart">
                <div className="cart-icon cartIconStyle">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span className="cartQuantityStyle">{cartCount}</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

}
