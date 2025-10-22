import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/AddVehicle.css";

const EditVehicle = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicle = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/vehicle/${id}`, {
        headers: { Authorization: token },
      });
      setForm(res.data);
    };
    fetchVehicle();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.put(`/api/vehicle/${id}`, form, {
      headers: { Authorization: token },
    });
    alert("Vehicle updated!");
    navigate("/view-vehicles");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="add-vehicle-wrapper">
      <form onSubmit={handleSubmit} className="add-vehicle-card">
        <h2>Edit Vehicle</h2>
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
          placeholder="Seats"
          value={form.seats}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVehicle;
