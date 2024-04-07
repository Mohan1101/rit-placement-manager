import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { firebaseApp } from '../../firebase';

function Dashboard() {


   
    return (
        <div>
            <div className='topnav'>
                <h1>CDP</h1>
                <div>
                    <h2>Welcome Admin<span id='username'></span></h2>
                </div>
            </div>
            <div className='sidenav'>
                <Link to="/staff/students"><button>Students</button></Link>
                <Link to="/staff/events"><button>Events</button></Link>
                <Link to="/staff/feedback"><button>Feedback</button></Link>
                <Link to="/signout"><button>Sign Out</button></Link>
            </div>
        </div>
    )
}

export default Dashboard
