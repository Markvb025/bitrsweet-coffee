import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "./Header.css";

const Header = () => {
  const { getCartItemsCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = getCartItemsCount();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">BitrSweet. Coffee</NavLink>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</NavLink></li>
            <li className="nav-item">
              <NavLink className="nav-link position-relative" to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                Cart
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-badge">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
