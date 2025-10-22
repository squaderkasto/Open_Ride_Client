import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "../styles/ViewBookings.css";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/ride/my", {
          headers: { Authorization: token },
        });
        setBookings(res.data);
      } catch (err) {
        alert("Failed to load bookings");
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bookings-wrapper">
      <h2>📖 Your Ride History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((ride, index) => (
            <div key={ride._id} className="booking-card">
              <h4>Booking #{index + 1}</h4>
              <p>
                <strong>Driver:</strong> {ride.driverId?.name || "N/A"}
              </p>
              <p>
                <strong>Vehicle:</strong>{" "}
                {ride.vehicleId?.vehicleType || "Unknown"}
              </p>
              <p>
                <strong>Pickup:</strong> {ride.pickup}
              </p>
              <p>
                <strong>Drop:</strong> {ride.drop}
              </p>
              <p>
                <strong>Distance:</strong> {ride.distanceKm} km
              </p>
              <p>
                <strong>Fare:</strong> ₹{ride.fare}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(ride.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBookings;
