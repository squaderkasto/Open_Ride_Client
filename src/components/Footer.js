import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-column">
          <h3>OpenRide</h3>
          <p>
            <a href="#">Visit Help Center</a>
          </p>
          {/* Social icons row moved below Help Center */}
          <div className="footer-social-row" style={{ marginTop: "16px" }}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <p>
            <a href="#">About us</a>
          </p>
          <p>
            <a href="#">Our offerings</a>
          </p>
          <p>
            <a href="#">Newsroom</a>
          </p>
          <p>
            <a href="#">Investors</a>
          </p>
          <p>
            <a href="#">Blog</a>
          </p>
          <p>
            <a href="#">Careers</a>
          </p>
        </div>

        <div className="footer-column">
          <h4>Products</h4>
          <p>
            <a href="#">Ride</a>
          </p>
          <p>
            <a href="#">Drive</a>
          </p>
          <p>
            <a href="#">Eat</a>
          </p>
          <p>
            <a href="#">OpenRide for Business</a>
          </p>
          <p>
            <a href="#">OpenRide Freight</a>
          </p>
          <p>
            <a href="#">Gift cards</a>
          </p>
          <p>
            <a href="#">OpenRide Health</a>
          </p>
        </div>

        <div className="footer-column">
          <h4>Global Citizenship</h4>
          <p>
            <a href="#">Safety</a>
          </p>
          <p>
            <a href="#">Sustainability</a>
          </p>
        </div>

        <div className="footer-column">
          <h4>Travel</h4>
          <p>
            <a href="#">Reserve</a>
          </p>
          <p>
            <a href="#">Airports</a>
          </p>
          <p>
            <a href="#">Cities</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} OpenRide. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
