import "../css/About.css";

function About() {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">Finding a home should be easier</h1>
          <p className="about-subtitle">
            Nestmate helps people find not only a place to live, but also
            compatible flatmates and a living situation that truly feels like home.
          </p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-heading">The Problem</h2>
          <p className="about-text">
            Searching for a shared apartment can be stressful, uncertain, and often
            frustrating. Most housing platforms focus only on the property itself,
            but ignore one of the most important aspects of shared living:
            the people you live with.
          </p>
          <p className="about-text">
            Finding the right flatmate can make the difference between simply
            sharing a space and actually feeling at home.
          </p>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="about-section about-solution">
        <div className="about-container">
          <h2 className="about-heading">Our Solution</h2>
          <p className="about-text">
            Nestmate was created to bring more transparency and compatibility to
            shared living. By combining housing listings with lifestyle preferences
            such as cleanliness, noise levels, smoking habits, and pets,
            Nestmate helps users discover living situations that truly match
            their expectations.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-heading">What You Can Do with Nestmate</h2>

          <div className="about-features">

            <div className="about-feature">
              <h3 className="feature-title">Browse Listings</h3>
              <p className="feature-text">
                Explore rooms and apartments shared by verified users.
              </p>
            </div>

            <div className="about-feature">
              <h3 className="feature-title">Save Favourites</h3>
              <p className="feature-text">
                Keep track of the places that interest you the most.
              </p>
            </div>

            <div className="about-feature">
              <h3 className="feature-title">Connect with Owners</h3>
              <p className="feature-text">
                Start conversations directly with listing owners through the platform.
              </p>
            </div>

            <div className="about-feature">
              <h3 className="feature-title">Find Compatible Flatmates</h3>
              <p className="feature-text">
                Match lifestyle preferences before moving in together.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CREATORS */}
      <section className="about-section about-creators">
        <div className="about-container">
          <h2 className="about-heading">The Project</h2>

          <p className="about-text">
            Nestmate was developed as a full-stack web application during the
            Ironhack Web Development Bootcamp by
            <strong> Mauricio Rojas Morales</strong> and
            <strong> María Pol Pujol</strong>.
          </p>

          <p className="about-text">
            The goal of this project was to build a real-world housing platform
            that combines modern web technologies with a user-centered experience.
            Nestmate includes features such as authentication, user profiles,
            messaging between users, and dynamic listing management.
          </p>

          <p className="about-text">
            More than just a technical project, Nestmate represents the idea that
            the right home is not only about the space you live in, but also about
            the people you share it with.
          </p>
        </div>
      </section>

    </div>
  );
}

export default About;