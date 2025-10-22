import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import apiService from "../services/api";
import "./Cart.css";

const Cart = () => {
  const { items: cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const isCartEmpty = cartItems.length === 0;
  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!customerInfo.name.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsCheckingOut(true);
    
    try {
      const orderData = {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        items: cartItems.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price)
        })),
        total_amount: total
      };

      const result = await apiService.createOrder(orderData);
      
      if (result.success) {
        alert(`Order placed successfully! Order ID: ${result.order_id}`);
        clearCart();
        navigate('/');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleBrowseMenu = () => {
    navigate('/menu');
  };

  return (
    <div className="page-layout">
      <div className="container my-5">
        <h2 className="fw-bold mb-4 text-center">Your Shopping Cart</h2>

        {isCartEmpty ? (
          <div className="text-center py-5">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              alt="Empty Cart"
              className="empty-cart-img mb-3"
            />
            <h5 className="fw-bold text-muted">Your cart is currently empty.</h5>
            <p>Looks like you haven't added anything yet!</p>
            <button 
              className="btn btn-coffee mt-3 px-4"
              onClick={handleBrowseMenu}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="row g-4 mb-5">
              {cartItems.map((item) => (
                <div key={item.id} className="col-md-6 col-lg-4">
                  <div className="card cart-item shadow-sm border-0 h-100">
                    <img
                      src={item.image_url || item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="fw-bold">{item.name}</h5>
                      <p className="text-muted mb-2">₱{item.price}</p>
                      <div className="d-flex justify-content-center align-items-center gap-3">
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="fw-bold">{item.quantity}</span>
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="btn btn-outline-danger btn-sm mt-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Information Form */}
            <div className="row justify-content-center mb-4">
              <div className="col-md-8 col-lg-6">
                <div className="card p-4 shadow-sm">
                  <h5 className="fw-bold mb-3 text-center">Customer Information</h5>
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="customerName" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="customerName"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="customerEmail" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="customerEmail"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="customerPhone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="customerPhone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        placeholder="+63 123 456 7890"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="cart-summary card p-4 mx-auto shadow-sm" style={{ maxWidth: "500px" }}>
              <h5 className="fw-bold mb-3 text-center">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (5%)</span>
                <span>₱{tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold mb-4">
                <span>Total</span>
                <span>₱{total.toFixed(2)}</span>
              </div>
              <button 
                className="btn btn-coffee w-100 py-2"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;