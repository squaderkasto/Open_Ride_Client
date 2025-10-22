import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="home-wrapper">
      <div className="welcome-card">
        <h2>Welcome back, {user?.name} 👋</h2>
        <p className="user-role">
          Role: <strong>{user?.role}</strong>
        </p>
      </div>

      <div className="actions-section">
        <>
          <div className="action-card" onClick={() => navigate("/book-ride")}>
            <h3>🚗 Book a Ride</h3>
            <p>Find and book nearby rides instantly.</p>
          </div>

          {/* 📖 My Bookings - Visible for all */}
          <div
            className="action-card"
            onClick={() => navigate("/view-bookings")}
          >
            <h3>📖 My Bookings</h3>
            <p>View your ride history and current bookings.</p>
          </div>

          {user?.role !== "rider" && (
            <>
              <div
                className="action-card"
                onClick={() => navigate("/add-vehicle")}
              >
                <h3>➕ Add Your Vehicle</h3>
                <p>Make your vehicle available for booking.</p>
              </div>
              <div
                className="action-card"
                onClick={() => navigate("/view-vehicles")}
              >
                <h3>🚙 My Vehicles</h3>
                <p>Manage your listed vehicles.</p>
              </div>
            </>
          )}
        </>

        {/* Other Cards from Navbar */}
        <div className="action-card" onClick={() => navigate("/wallet")}>
          <h3>💰 Wallet</h3>
          <p>Check your OpenRide balance and transactions.</p>
        </div>

        <div className="action-card" onClick={() => navigate("/activity")}>
          <h3>📊 Activity</h3>
          <p>Track your past rides and earnings.</p>
        </div>

        <div className="action-card" onClick={() => navigate("/promotions")}>
          <h3>🎁 Promotions</h3>
          <p>View current offers and promo codes.</p>
        </div>

        <div className="action-card" onClick={() => navigate("/account")}>
          <h3>👤 Manage Account</h3>
          <p>Update your personal and contact details.</p>
        </div>

        <div className="action-card" onClick={() => navigate("/help")}>
          <h3>🛟 Help</h3>
          <p>Get support and FAQs for OpenRide.</p>
        </div>
      </div>

      <button className="logout-button" onClick={logout}>
        🚪 Logout
      </button>
    </div>
  );
};

export default Home;
