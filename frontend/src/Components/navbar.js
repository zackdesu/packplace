import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation().pathname;

  return (
    <>
      <nav className="sticky-top">
        <h1 className="logo">PackPlace</h1>
        <div className="menu">
          <ul>
            <li>
              <Link
                to="/"
                className={
                  location === "/" ||
                  location === "/login" ||
                  location === "/signup"
                    ? "active"
                    : ""
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className={location === "/features" ? "active" : ""}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location === "/about" ? "active" : ""}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="acc">
          <ul className="log-sign">
            <li>
              <a href="/login" className="log-in">
                Log In
              </a>
            </li>
            <li>
              <a href="/signup" className="sign-up">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
