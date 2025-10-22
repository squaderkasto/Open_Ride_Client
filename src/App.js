import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddVehicle from "./pages/AddVehicle";
import BookRide from "./pages/BookRide";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import EditVehicle from "./pages/EditVehicle";
import ViewVehicles from "./pages/ViewVehicle";
import ViewBookings from "./pages/ViewBookings";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
            <Route path="/book-ride" element={<BookRide />} />
            <Route path="/view-vehicles" element={<ViewVehicles />} />
            <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
            <Route path="/view-bookings" element={<ViewBookings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
