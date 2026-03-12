import "../css/Spinner.css";

function Spinner() {
  return (
    <div className="spinner-page">

      <div className="spinner-wrapper">

        <div className="spinner-ring"></div>

        <div className="spinner-house">
          🏠
        </div>

      </div>

      <h1 className="spinner-logo">
        <span className="logo-nest">Nest</span>
        <span className="logo-mate">Mate</span>
      </h1>

      <p className="spinner-text">Loading your next stay...</p>

      <div className="spinner-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  );
}

export default Spinner;