import React from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useSidebar } from "../contexts/SidebarContext";
import "./Contact.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className={`contact-layout page-layout d-flex ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="content flex-grow-1 d-flex flex-column">
        <div className="container my-5 flex-grow-1">
          {/* Top Banner */}
          <div className="contact-banner text-center mb-5">
            <h4>Get in Touch</h4>
            <p>
              We’d love to hear from you! Whether it’s feedback, a question, or just saying hi.
            </p>
          </div>

          {/* Contact Details */}
          <section className="contact-section mb-5">
            <h5 className="section-title">Our Contact Details</h5>
            <div className="contact-info">
              <p>
                <FaMapMarkerAlt /> <strong>Address:</strong> 123 Brew Street, Cabuyao, Laguna, Philippines
              </p>
              <p>
                <FaPhoneAlt /> <strong>Phone:</strong> +63 912 345 6789
              </p>
              <p>
                <FaEnvelope /> <strong>Email:</strong> hello@coffee-delight.com
              </p>
              <p>
                <strong>Business Hours:</strong> Monday – Sunday | 7:00 AM - 10:00 PM
              </p>
            </div>
          </section>

          {/* Contact Form */}
          <section className="contact-form-section mb-5">
            <h5 className="section-title">Send Us a Message</h5>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="4" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </section>

          {/* Map Section */}
          <section className="map-section mb-5">
            <h5 className="section-title">Find Us Here</h5>
            <div className="map-placeholder">
              <iframe
                title="BitrSweet Coffee Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3850.651298149743!2d121.123!3d14.248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd5b8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sCabuyao%2C%20Laguna!5e0!3m2!1sen!2sph!4v1614300000000!5m2!1sen!2sph"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </section>
        </div>

        
      </div>
    </div>
  );
};

export default Contact;
