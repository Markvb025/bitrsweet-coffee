import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="page-layout">
      <div className="container my-5">
          {/* Hero Section */}
          <div className="text-center mb-5">
            <h1 className="fw-bold display-5">Welcome to BitrSweet. Coffee</h1>
            <p className="lead">
              Where every cup tells a story — crafted with love, warmth, and precision.
            </p>
            
            {/* YouTube Video Hero */}
            <div className="hero-video-container mt-4">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/Amh5NZMkf3I?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=0&disablekb=1"
                title="BitrSweet Coffee - Our Story"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="hero-video"
              ></iframe>
            </div>
          </div>

          {/* Highlight Section */}
          <section className="row align-items-center mb-5">
            <div className="col-md-6">
              <h3 className="fw-bold">Brewed with Passion</h3>
              <p>
                At BitrSweet. Coffee, we take pride in every espresso shot we pull and every pastry
                we bake. Each creation is a blend of artistry and science, ensuring that every visit
                feels like home — comforting, aromatic, and unforgettable.
              </p>
              <button className="btn btn-coffee mt-3 px-4">Explore Our Menu</button>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="https://zandocoffee.com.au/wp-content/uploads/2020/06/covermilkpouring.jpg"
                alt="Barista pouring coffee"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "280px", objectFit: "cover" }}
              />
            </div>
          </section>

          {/* Featured Items */}
          <section className="mb-5">
            <h3 className="fw-bold text-center mb-4">Our Favorites</h3>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src="https://www.chilitochoc.com/wp-content/uploads/2022/12/homemade-caramel-latte-ft.jpg"
                    alt="Caramel Latte"
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">Caramel Latte</h5>
                    <p className="card-text">Smooth, creamy, and perfectly sweetened.</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src="https://bakingmischief.com/wp-content/uploads/2019/05/iced-mocha-image-square.jpg"
                    alt="Iced Mocha"
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">Iced Mocha</h5>
                    <p className="card-text">A refreshing mix of espresso, chocolate, and milk.</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src="https://www.homemadeinterest.com/wp-content/uploads/2021/10/Easy-Chocolate-Croissant_IG-3.jpg"
                    alt="Chocolate Croissant"
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">Chocolate Croissant</h5>
                    <p className="card-text">Flaky, buttery pastry with rich chocolate filling.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visit Us Section */}
          <section className="text-center mt-5">
            <h3 className="fw-bold">Visit Us Today</h3>
            <p className="lead">
              Come experience the aroma, taste, and warmth of BitrSweet. Coffee in person.
            </p>
            <button className="btn btn-coffee px-4">Find Our Café</button>
          </section>
        </div>
    </div>
  );
};

export default Home;
