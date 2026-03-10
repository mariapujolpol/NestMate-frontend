import "../css/HomePage.css";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero-image.jpg";

<<<<<<< HEAD
function Home() {




  
  return <div>Home</div>;
=======
function HomePage() {
  const featuredRooms = [
    {
      id: 1,
      title: "Sunny Studio in Kreuzberg",
      city: "Berlin, Kreuzberg",
      price: 650,
      tags: ["Pet-friendly", "Balcony"],
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      flatmates: 2,
      rating: 4.9,
    },
    {
      id: 2,
      title: "Cozy Flat near Shoreditch",
      city: "London, Hackney",
      price: 850,
      tags: ["LGBTQ+", "Non-smoking"],
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      flatmates: 3,
      rating: 4.7,
    },
    {
      id: 3,
      title: "Modern Room in El Born",
      city: "Barcelona, Ciutat Vella",
      price: 580,
      tags: ["Furnished", "Bills incl."],
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      flatmates: 1,
      rating: 4.8,
    },
  ];

  return (
    <div className="homepage">
    {/* HERO */}
    <section
  className="hero"
  style={{ backgroundImage: `url(${heroImage})` }}
>
  <div className="hero-overlay"></div>

  <div className="hero-content">
    <div className="hero-text">
          <span className="hero-badge">Find your perfect flatmate 🏠</span>

          <h1>
            Your next home
            <br />
            <span>starts here.</span>
          </h1>

          <p>
            NestMate connects you with compatible flatmates and the best shared
            living spaces in your city. No stress, just home.
          </p>

          <div className="hero-search">
            <input
              type="text"
              placeholder="Enter city or neighbourhood..."
            />
            <button>Search</button>
          </div>

          <div className="hero-stats">
            <span>• 2,400+ listings</span>
            <span>• 98% match rate</span>
            <span>• Free to use</span>
          </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <p className="section-label">HOW IT WORKS</p>
        <h2>Three steps to home</h2>

        <div className="steps-grid">
          <article className="step-card">
            <div className="step-icon">⌕</div>
            <p className="step-number">STEP 1</p>
            <h3>Search & Filter</h3>
            <p>
              Browse hundreds of verified rooms filtered by budget, location,
              and lifestyle preferences.
            </p>
          </article>

          <article className="step-card">
            <div className="step-icon">◔</div>
            <p className="step-number">STEP 2</p>
            <h3>Match & Connect</h3>
            <p>
              Our compatibility system matches you with flatmates who share your
              vibe and living style.
            </p>
          </article>

          <article className="step-card">
            <div className="step-icon">⌂</div>
            <p className="step-number">STEP 3</p>
            <h3>Move In</h3>
            <p>
              Schedule visits, sign digitally, and settle into your new home.
              It’s that simple.
            </p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>Ready to find your nest?</h2>
          <p>
            Join thousands of happy flatmates who found their perfect match on
            NestMate.
          </p>
          <Link to="/register" className="cta-button">
            Get Started →
          </Link>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured-rooms">
        <p className="section-label">FEATURED ROOMS</p>
        <h2>Spaces you’ll love</h2>
        <p className="featured-subtitle">
          Hand-picked listings from verified hosts, ready for you to move in.
        </p>

        <div className="rooms-grid">
          {featuredRooms.map((room) => {
            return (
              <article key={room.id} className="room-card">
                <div className="room-image-wrapper">
                  <img src={room.image} alt={room.title} className="room-image" />
                  <button className="fav-btn">♡</button>

                  <div className="room-tags">
                    {room.tags.map((tag, index) => (
                      <span key={index} className="room-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="room-info">
                  <div className="room-title-row">
                    <h3>{room.title}</h3>
                    <span className="room-rating">⭐ {room.rating}</span>
                  </div>

                  <p className="room-city">{room.city}</p>

                  <div className="room-bottom">
                    <span className="room-price">€{room.price}/mo</span>
                    <span className="room-flatmates">{room.flatmates} flatmates</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
>>>>>>> dev
}

export default HomePage;