import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaUserCircle, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { firebaseApp } from '../../firebase';

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <div className='relative bg-nav flex items-center justify-between px-4'>
                <div className='w-36 py-4 h-24'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/rit-placement.appspot.com/o/assests%2Fritlogo2.png?alt=media&token=096cd96c-47c4-40de-b2d3-baf87b3e9d60" alt="RIT" className='w-full h-full' />
                </div>
                <div className='flex items-center gap-4 font-bold text-white ' >
                    <FaUserCircle className='text-4xl' />
                    <h2 className='text-xl'>Welcome Admin</h2>
                </div>
            </div>
            <button className={`absolute top-28 transform -translate-y-1/2 ${isSidebarOpen ? 'left-52' : 'left-2'}`} onClick={toggleSidebar}>
                {isSidebarOpen ? <FaAngleLeft className="text-2xl text-white" /> : <FaAngleRight className="text-2xl text-white" />}
            </button>
            <div className={`absolute flex flex-col  h-screen w-48 gap-2 bg-sidenav p-4 ${isSidebarOpen ? 'left-0' : '-left-52'}`}>
                <Link to="/staff/students">
                    <button className="bg-nav w-full hover:bg-nav-dark text-white font-semibold py-2 px-4 border border-white rounded">
                        Students
                    </button>
                </Link>
                <Link to="/staff/events">
                    <button className="bg-nav w-full hover:bg-nav-dark text-white font-semibold py-2 px-4 border border-white rounded">
                        Events
                    </button>
                </Link>
                <Link to="/staff/feedback">
                    <button className="bg-nav w-full hover:bg-nav-dark text-white font-semibold py-2 px-4 border border-white rounded">
                        Feedback
                    </button>
                </Link>
                <Link to="/signout">
                    <button className="bg-nav w-full hover:bg-nav-dark text-white font-semibold py-2 px-4 border border-white rounded">
                        Sign Out
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;
