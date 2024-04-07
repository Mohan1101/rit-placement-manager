import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar'

function sign() {
  return (
    <div className="sign">
      <Navbar/>
      
      <div>
        <h1 className='font-bold text-3xl py-6 '>Login as</h1>
        <Link to="/staff/signin">
          <button>Admin</button>
        </Link>
        <Link to="/student/signin" >
          <button>Student</button>
        </Link>
      </div>
    </div>
  )
}

export default sign