import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#">
          Mineview
        </a>
        <a
          className="nav-link"
          href="https://github.com/mtrsvn/Mineview"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#fff', fontSize: '1em', textDecoration: 'none' }}
        >
          GitHub
        </a>
      </div>
    </nav>
  )
}

export default Navbar