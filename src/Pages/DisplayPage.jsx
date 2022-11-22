
import React from 'react'
import { Link } from 'react-router-dom'


const DisplayPage = () => {
  return (
    <>
      <div className='err '>
        <h1> please Login </h1>
        <button class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold" ><Link to='/login' > login</Link> </button>
      </div>
    </>

  )
}

export default DisplayPage
