import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#">Mineview</a>
        <a
          className="nav-link github-link"
          href="https://github.com/mtrsvn/Mineview"
          target="_blank"
        >
          GitHub
        </a>
      </div>
      <style>{`
        .github-link {
          color: #fff !important;
          font-size: 1em;
          text-decoration: none;
          transition: text-shadow 0.2s;
        }
        .github-link:hover {
          text-shadow: 0 0 8px #fff, 0 0 4px #fff;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;