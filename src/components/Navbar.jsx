
import React from 'react'

// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {localStorage.getItem('token') != null ? <>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/addbook">Add Book</Link>
              </li>
              <button className="btn btn-outline-danger mx-2 left" onClick={() => { localStorage.clear(); window.location.reload() }} > Logout </button>
            </> : <>
              <form className="d-flex" role="search">
                <button className="btn btn-outline-success mx-2 left " ><Link to='/signup'>Sign Up</Link></button>
              </form>
            </>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}


// Navbar.propTypes = {
//     title : PropTypes.string.isRequired,
//     aboutText : PropTypes.string.isRequired
// }

// Navbar.defaultProps = {
//     title: 'Set title here',
//     aboutText: 'About'
// }
