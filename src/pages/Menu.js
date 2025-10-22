import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import apiService from "../services/api";
import "./Menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const items = await apiService.getMenuItems();
        setMenuItems(items);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(items.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        setError('Failed to load menu items. Please check if the backend server is running.');
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    // Show a brief success message (you can enhance this with a toast notification)
    console.log(`Added ${item.name} to cart!`);
  };

  const handleOrderNow = () => {
    navigate('/menu');
  };

  if (loading) {
    return (
      <div className="page-layout">
        <div className="container my-5 d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading menu items...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-layout">
        <div className="container my-5 d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="text-center">
            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">Unable to Load Menu</h4>
              <p>{error}</p>
              <hr />
              <p className="mb-0">Please make sure the backend server is running on port 5000.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <div className="container my-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Menu</h2>
          <p className="lead">
            Explore our handcrafted drinks and freshly baked pastries — made with love daily.
          </p>
          <img
            src="https://images.unsplash.com/photo-1498804103079-a6351b050096"
            alt="Coffee Menu"
            className="img-fluid rounded mt-3"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </div>

        {/* Menu Categories */}
        {categories.map((category) => (
          <section key={category} className="mb-5">
            <h4 className="fw-bold border-bottom pb-2">{category}</h4>
            <div className="row mt-3">
              {menuItems
                .filter((item) => item.category === category)
                .map((item, index) => (
                  <div key={item.id || index} className="col-md-6 col-lg-4 mb-4">
                    <div 
                      className="card menu-item-card shadow-sm border-0 h-100"
                      onClick={() => handleAddToCart(item)}
                    >
                      <img
                        src={item.image_url || item.image}
                        alt={item.name}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column justify-content-between text-center">
                        <h5 className="fw-bold">{item.name}</h5>
                        <p className="text-muted">{item.category}</p>
                        <p className="text-muted small">{item.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <strong className="price-text">₱{item.price}</strong>
                          <button 
                            className="btn btn-coffee btn-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(item);
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}

        {/* Call to Action */}
        <section className="text-center mt-5">
          <h5 className="fw-bold">Craving Something Sweet?</h5>
          <p>Visit our café or order online to experience BitrSweet. Coffee today!</p>
          <button 
            className="btn btn-coffee px-4"
            onClick={handleOrderNow}
          >
            Order Now
          </button>
        </section>
      </div>
    </div>
  );
};

export default Menu;