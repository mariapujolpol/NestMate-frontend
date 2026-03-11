import "../css/ContactPage.css";

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">

        <h1 className="contact-title">Contact</h1>

        <p className="contact-text">
          Nestmate was created as a final project at the Ironhack Web Development
          Bootcamp by <strong>Mauricio Rojas Morales</strong> and{" "}
          <strong>María Pol Pujol</strong>.
        </p>

        <p className="contact-text">
          If you'd like to learn more about the project, collaborate, or simply
          connect with us, feel free to reach out.
        </p>

        <div className="contact-cards">

          <div className="contact-card">
            <h3 className="contact-name">Mauricio Rojas M.</h3>

            <a
              href="mailto:your-mauricioalonsorojasm@gmail.com"
              className="contact-link"
            >
              Email
            </a>

            <a
              href="https://https://www.linkedin.com/in/mauricioalonsorojasm/"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/mauricioalonsorojasm-oss"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              GitHub
            </a>
          </div>

          <div className="contact-card">
            <h3 className="contact-name">María Pol Pujol</h3>

            <a
              href="mailto: maria.pujolpol@gmail.com"
              className="contact-link"
            >
              Email
            </a>

            <a
              href="https://www.linkedin.com/in/mariapolpujol"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              LinkedIn
            </a>


            <a
              href="https://github.com/mariapujolpol"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              GitHub
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Contact;