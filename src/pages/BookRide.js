import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import LocationPicker from "../components/LocationPicker";
import "../styles/BookRide.css";

const BookRide = () => {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [suggestedFare, setSuggestedFare] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get("/api/vehicle");
        setVehicles(res.data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    const fetchAndSetDistance = async () => {
      if (pickup && drop) {
        try {
          const origin = `${pickup.lat},${pickup.lng}`;
          const destination = `${drop.lat},${drop.lng}`;
          const res = await axios.get(
            `/api/get-distance?origins=${origin}&destinations=${destination}`
          );

          const distText = res.data.rows[0].elements[0].distance.text;
          const distKm = parseFloat(distText.replace(" km", ""));
          setDistance(distKm);

          if (vehicles.length > 0) {
            const defaultVehicle = vehicles[0];
            await getAIFare(defaultVehicle.vehicleType, distKm);
          }
        } catch (error) {
          console.error("Error fetching distance:", error);
        }
      }
    };

    fetchAndSetDistance();
  }, [pickup, drop]);

  const getAIFare = async (vehicleType, distKm) => {
    try {
      const time = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const res = await axios.post("/api/ai/fare", {
        vehicleType,
        distanceKm: distKm,
        time,
        location: "Pune",
      });

      setSuggestedFare(res.data.suggestedFare);
    } catch (err) {
      console.error("AI fare error:", err);
    }
  };

  const handleVehicleSelect = async (vehicle) => {
    setSelectedVehicle(vehicle);
    if (pickup && drop && distance !== null) {
      const estFare = vehicle.baseFare + distance * vehicle.perKmRate;
      setFare(estFare.toFixed(2));

      await getAIFare(vehicle.vehicleType, distance);
    }
  };

  const handleBookRide = async () => {
    if (!pickup || !drop || !selectedVehicle || distance === null) {
      alert("Please complete all details");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to book a ride.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/ride",
        {
          vehicleId: selectedVehicle._id,
          pickup: `Lat:${pickup.lat}, Lng:${pickup.lng}`,
          drop: `Lat:${drop.lat}, Lng:${drop.lng}`,
          distanceKm: distance,
        },
        {
          headers: { Authorization: token },
        }
      );

      alert(`Ride booked! Fare: ₹${res.data.fare}`);
    } catch (error) {
      console.error("Error booking ride:", error);
      alert("Error booking ride.");
    }
  };

  return (
    <div className="book-ride-fullpage">
      <div className="map-section">
        <LocationPicker
          setPickup={setPickup}
          setDrop={setDrop}
          setMapLoaded={setMapLoaded}
          pickup={pickup}
          drop={drop}
        />
      </div>

      <div className="location-fields">
        <div className="field-group">
          <label>Pickup Location</label>
          <input
            type="text"
            value={
              pickup
                ? `Lat: ${pickup.lat.toFixed(5)}, Lng: ${pickup.lng.toFixed(5)}`
                : ""
            }
            readOnly
          />
        </div>
        <div className="field-group">
          <label>Drop Location</label>
          <input
            type="text"
            value={
              drop
                ? `Lat: ${drop.lat.toFixed(5)}, Lng: ${drop.lng.toFixed(5)}`
                : ""
            }
            readOnly
          />
        </div>
        {distance && (
          <div className="distance-display">
            <strong>Distance:</strong> {distance.toFixed(2)} km
          </div>
        )}
        {suggestedFare && selectedVehicle && (
          <p className="ai-fare-suggestion">
            ✨ AI-Suggested Fare: <strong>₹{suggestedFare}</strong>
          </p>
        )}
      </div>

      {mapLoaded && !(pickup && drop) && (
        <div className="instruction-text">
          <h3>
            Please select pickup and drop locations to view available rides.
          </h3>
        </div>
      )}

      {pickup && drop && (
        <>
          <div className="ride-options">
            <h3>Available Rides</h3>
            {vehicles.length === 0 ? (
              <div className="no-driver-message">
                Sorry, No Driver available nearby
              </div>
            ) : (
              vehicles.slice(0, 5).map((vehicle) => {
                const isSelected = selectedVehicle?._id === vehicle._id;
                const fareEstimate =
                  distance !== null
                    ? (vehicle.baseFare + distance * vehicle.perKmRate).toFixed(
                        2
                      )
                    : null;

                return (
                  <div
                    className={`ride-card ${isSelected ? "selected" : ""}`}
                    key={vehicle._id}
                    onClick={() => handleVehicleSelect(vehicle)}
                  >
                    <img
                      src={require(`../icons/${vehicle.vehicleType}.png`)}
                      alt={vehicle.vehicleType}
                      className="vehicle-icon"
                    />
                    <div className="ride-info">
                      <h4>
                        {vehicle.model} ({vehicle.seats} seats)
                      </h4>
                      <p>
                        Base Fare: ₹{vehicle.baseFare}, Rate: ₹
                        {vehicle.perKmRate}/km
                      </p>
                      <small>2 min away</small>
                    </div>
                    {distance && (
                      <div className="fare-tag">₹{fareEstimate}</div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="book-footer">
            <span>💰 Cash</span>
            <span>🏷️ Offers</span>
            <button onClick={handleBookRide}>Book Ride</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookRide;
