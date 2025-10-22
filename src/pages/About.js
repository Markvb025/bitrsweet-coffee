import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="page-layout">
      <div className="container my-5">
        {/* Header / Intro */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">About BitrSweet. Coffee</h2>
          <p className="lead">
            Where every cup tells a story — brewed with passion, precision, and a touch of warmth.
          </p>
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93"
            alt="Our Café"
            className="img-fluid rounded mt-3"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </div>

        {/* Our Story */}
        <section className="mb-5" id="story">
          <h3 className="fw-bold">Our Story</h3>
          <p>
            Founded in 2025, BitrSweet. Coffee began as a small neighborhood café with a big mission:
            to create a warm, welcoming space where everyone can enjoy the perfect blend of bitters and sweets.
            Our passion for artisan coffee and handcrafted pastries drives every latte, espresso,
            and freshly baked croissant we serve.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-5" id="mission">
          <h3 className="fw-bold">Our Mission</h3>
          <ul>
            <li>
              🌱 <strong>Sustainable Sourcing:</strong> We partner with ethical coffee farms that prioritize
              fair wages and eco-friendly practices.
            </li>
            <li>
              ☕ <strong>Quality Craftsmanship:</strong> Every cup is brewed to perfection by skilled baristas,
              ensuring a consistent and flavorful experience.
            </li>
            <li>
              🤝 <strong>Community Connection:</strong> We believe in bringing people together and giving back
              to our local community.
            </li>
          </ul>
        </section>

        {/* Vision & Values */}
        <section className="mb-5" id="values">
          <h3 className="fw-bold">Our Vision & Values</h3>
          <p>
            At BitrSweet. Coffee, our vision is to make every sip memorable. We value authenticity,
            sustainability, and community — qualities that guide us in every roast, pour, and smile we share.
          </p>
        </section>

        {/* Newsletter Signup */}
        <section className="text-center mb-5">
          <h5 className="fw-bold mb-3">Subscribe to Our Newsletter</h5>
          <form className="d-flex justify-content-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control w-50 me-2"
              required
            />
            <button type="submit" className="btn btn-coffee">
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default About;