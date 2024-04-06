import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { firebaseApp } from '../../firebase';

function Dashboard() {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        // Fetch user details from Firebase Firestore
        const fetchUserDetails = async () => {
            try {
                const loginCollectionRef = firebaseApp.firestore().collection('Login');
                const querySnapshot = await loginCollectionRef.get();
                const userDetailsData = querySnapshot.docs.map(doc => doc.data());
                setUserDetails(userDetailsData);
                const username = userDetailsData[0].username;
                document.getElementById('username').innerHTML = username;
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div>
            <div className='topnav'>
                <h1>CDP</h1>
                <div>
                    <h2>Welcome <span id='username'></span></h2>
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
