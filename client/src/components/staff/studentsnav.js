import React from 'react'
import Navbar from './navbar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function students() {
  return (
    <div>
        <div className='flex justify-center items-center  gap-6 py-2 bg-sidenav'>
          <Link to="/staff/allstudents"><button>All Students</button></Link>
          <Link to="/staff/registeredstudents"><button>Registered Students</button></Link>
          <Link to="/staff/placedstudents"><button>Placed Students</button></Link>
          <Link to="/staff/eligiblestudents"><button>Eligible Students</button></Link>
          <Link to="/staff/higherstudies"><button>Higher Studies</button></Link>
          <Link to="/staff/addstudent"><button>Add Student</button></Link>
        </div>
    </div>
  )
}

export default students