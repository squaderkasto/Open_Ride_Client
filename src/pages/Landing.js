import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return (
    <div className="landing-container">
      <div className="landing-hero">
        <h1>OpenRide</h1>
        <p>Your Open-Source Ride Sharing Platform</p>
        <button
          onClick={() => {
            if (token && user) {
              navigate("/home"); // ✅ Already logged in
            } else {
              navigate("/signup"); // 🚪 Not logged in
            }
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;
