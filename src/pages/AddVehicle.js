import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/AddVehicle.css";

const AddVehicle = () => {
  const [form, setForm] = useState({
    vehicleType: "",
    numberPlate: "",
    baseFare: "",
    perKmRate: "",
    seats: "", // default empty, will be number
    description: "", // optional
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // Convert seats and fares to numbers before sending
      const payload = {
        ...form,
        baseFare: form.baseFare ? Number(form.baseFare) : undefined,
        perKmRate: form.perKmRate ? Number(form.perKmRate) : undefined,
        seats: form.seats ? Number(form.seats) : undefined,
      };
      await axios.post("/api/vehicle", payload, {
        headers: { Authorization: token },
      });
      alert("Vehicle added!");
    } catch (err) {
      alert("Error adding vehicle");
    }
  };

  return (
    <div className="add-vehicle-wrapper">
      <form onSubmit={handleSubmit} className="add-vehicle-card">
        <h2>Add Your Vehicle</h2>

        <select
          name="vehicleType"
          value={form.vehicleType}
          onChange={handleChange}
          required
        >
          <option value="">Select Vehicle Type</option>
          <option value="bike">Bike</option>
          <option value="auto">Auto</option>
          <option value="cab_economy">Cab Economy</option>
          <option value="cab_premium">Cab Premium</option>
        </select>

        <input
          name="numberPlate"
          placeholder="Number Plate"
          value={form.numberPlate}
          onChange={handleChange}
          required
        />
        <input
          name="baseFare"
          type="number"
          placeholder="Base Fare"
          value={form.baseFare}
          onChange={handleChange}
          required
        />
        <input
          name="perKmRate"
          type="number"
          placeholder="Per KM Rate"
          value={form.perKmRate}
          onChange={handleChange}
          required
        />
        <input
          name="seats"
          type="number"
          placeholder="Seats (e.g., 4)"
          value={form.seats}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Short Description (optional)"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddVehicle;
