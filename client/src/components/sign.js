import React from 'react'
import { Link } from 'react-router-dom'

function sign() {
  return (
    <div className="sign">
      <div>
        <h1>Login as</h1>
        <Link to="/staff/signin">
          <button>Admin</button>
        </Link>
        <Link to="/student/signin">
          <button>Student</button>
        </Link>
      </div>
    </div>
  )
}

export default sign