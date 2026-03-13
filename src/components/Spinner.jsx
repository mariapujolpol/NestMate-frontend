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
        <span className="logo-nest">nest</span>
        <span className="logo-mate">mate</span>
      </h1>

      <p className="spinner-text">Loading your next home...</p>

      <div className="spinner-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  );
}

export default Spinner;