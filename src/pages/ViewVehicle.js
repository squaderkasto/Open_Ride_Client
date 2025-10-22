import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/ViewVehicles.css";

const ViewVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/vehicle/my", {
        headers: { Authorization: token },
      });
      setVehicles(res.data);
    };
    fetchVehicles();
  }, []);

  return (
    <div className="vehicle-list-wrapper">
      <h2>🚗 My Vehicles</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles added yet.</p>
      ) : (
        <div className="vehicle-list">
          {vehicles.map((v) => (
            <div className="vehicle-card" key={v._id}>
              <h4>{v.vehicleType.replace("_", " ").toUpperCase()}</h4>
              <p>
                <strong>Plate:</strong> {v.numberPlate}
              </p>
              <p>
                <strong>Fare:</strong> ₹{v.baseFare} + ₹{v.perKmRate}/km
              </p>
              <p>
                <strong>Seats:</strong> {v.seats}
              </p>
              <p>
                <strong>Description:</strong> {v.description}
              </p>
              <button onClick={() => navigate(`/edit-vehicle/${v._id}`)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewVehicles;
