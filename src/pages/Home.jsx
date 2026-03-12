import "../css/HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-image.jpg";
import { useEffect, useState, useContext } from "react";
import { getAllListings } from "../services/listings.service";
import ListingCard from "../components/ListingCard";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getAllListings();

        const shuffled = response.data.sort(() => 0.5 - Math.random());

        setFeaturedListings(shuffled.slice(0, 3));
      } catch (error) {
        console.log("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleSearch = () => {
    if (!searchCity.trim()) return;

    navigate(`/listings?city=${searchCity}`);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="homepage">
      {/* HERO */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content page-container">
          <div className="hero-text">
            <span className="hero-badge">Find your perfect flatmate 🏠</span>

            <h1>
              Your next home
              <br />
              <span>starts here.</span>
            </h1>

            <p>
              NestMate connects you with compatible flatmates and the best
              shared living spaces in your city. No stress, just home.
            </p>

            <div className="hero-search">
              <input
                type="text"
                placeholder="Enter city..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
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
      <section className="how-it-works page-container section-spacing">
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
              It's that simple.
            </p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section page-container section-spacing">
        <div className="cta-box">
          <h2>Ready to find your nest?</h2>
          <p>
            Join thousands of happy flatmates who found their perfect match on
            NestMate.
          </p>

          <Link to={user ? "/listings" : "/register"} className="cta-button">
            Get Started →
          </Link>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured-rooms section-spacing">
        <div className="page-container">
          <p className="section-label">FEATURED ROOMS</p>
          <h2>Spaces you'll love</h2>
          <p className="featured-subtitle">
            Hand-picked listings from verified hosts, ready for you to move in.
          </p>

          <div className="listings-grid">
            {featuredListings.map((listing) => {
              return (
                <Link
                  key={listing._id}
                  to={`/listings/${listing._id}`}
                  className="room-card-link"
                >
                  <ListingCard listing={listing} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;