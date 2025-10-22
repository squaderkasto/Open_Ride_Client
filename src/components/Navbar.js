import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLanding = location.pathname === "/";

  const [showDropdown, setShowDropdown] = useState(false);
  const [sticky, setSticky] = useState(false); // click-sticky state
  const dropdownRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (sticky) {
          setSticky(false);
          setShowDropdown(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sticky]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")}>
        OpenRide
      </div>

      {isLanding ? (
        <div className="navbar-right">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      ) : user ? (
        <div className="navbar-right">
          {location.pathname !== "/home" && (
            <>
              <button onClick={() => navigate("/home")}>Home</button>

              <button onClick={() => navigate("/book-ride")}>Book Ride</button>
              <button onClick={() => navigate("/view-bookings")}>
                My Bookings
              </button>
              {user.role !== "rider" && (
                <>
                  <button onClick={() => navigate("/add-vehicle")}>
                    Add Vehicle
                  </button>
                  <button onClick={() => navigate("/view-vehicles")}>
                    My Vehicles
                  </button>
                </>
              )}
            </>
          )}

          <div
            className="user-dropdown"
            ref={dropdownRef}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => {
              if (!sticky) setShowDropdown(false);
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const newSticky = !sticky;
                setSticky(newSticky);
                setShowDropdown(newSticky || true);
              }}
            >
              {user.name} ▾
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <p>
                  <strong>OpenRide Cash:</strong> ₹0.00
                </p>
                <button onClick={() => navigate("/wallet")}>Wallet</button>
                <button onClick={() => navigate("/activity")}>Activity</button>
                <button onClick={() => navigate("/promotions")}>
                  Promotions
                </button>
                <button onClick={() => navigate("/account")}>
                  Manage Account
                </button>
                <button onClick={() => navigate("/help")}>Help</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="navbar-right">
          {/* Optional fallback for unauthenticated users */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
