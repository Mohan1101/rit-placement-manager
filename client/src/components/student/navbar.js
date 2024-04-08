import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight, FaUserCircle } from 'react-icons/fa';

function Dashboard() {
    const [student, setStudent] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const storedRollnumber = localStorage.getItem('rollnumber');
        if (storedRollnumber) {
            getStudentData(storedRollnumber);
        }
    }, []);

    const getStudentData = async (rollnumber) => {
        try {
            const response = await axios.get('https://rit-placement-manager.vercel.app/students');
            const students = response.data;
            const studentData = students.find((student) => student.rollnumber === rollnumber);
            setStudent(studentData);
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
      
    return (
        <div className='relative'>
            <div className='fixed top-0 w-full bg-nav flex items-center justify-between px-4 z-50'>
            <div className='w-32 py-1 h-16'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/rit-placement.appspot.com/o/assests%2Fritlogo2.png?alt=media&token=096cd96c-47c4-40de-b2d3-baf87b3e9d60" alt="RIT" className='w-full h-full' />
                </div>
                <div className='flex items-center gap-4 font-bold text-white'>
                <FaUserCircle className='text-4xl' />
                    <h2 className='text-xl'>Welcome <span className='text-xl'>{student && student.name}</span></h2>
                </div>
            </div>
            <button className={`fixed top-20 z-20 transform -translate-y-1/2 ${isSidebarOpen ? 'left-52' : 'left-2'}`} onClick={toggleSidebar}>
                {isSidebarOpen ? <FaAngleLeft className="text-2xl text-white" /> : <FaAngleRight className="text-2xl text-white" />}
            </button>
            <div className={`fixed flex flex-col justify-center h-screen w-48 gap-2 bg-sidenav p-4 z-10 ${isSidebarOpen ? 'left-0' : '-left-52'}`}>
                <Link to="/student/profile">
                    <button className="bg-nav w-full hover:bg-nav-dark text-white font-semibold py-2 px-4 border border-white rounded-lg">Profile</button>
                </Link>
                <Link to="/student/companies">
                    <button className="bg-nav w-full hover:bg-nav-dark text-white font-semibold py-2 px-4 border border-white rounded-lg">Companies</button>
                </Link>
                <Link to="/student/feedback">
                    <button className="bg-nav w-full hover:bg-nav-dark text-white font-semibold py-2 px-4 border border-white rounded-lg">Feedback</button>
                </Link>
                <Link to="/student/review">
                    <button className="bg-nav w-full hover:bg-nav-dark text-white font-semibold py-2 px-4 border border-white rounded-lg">Review</button>
                </Link>
                <Link to="/signout">
                    <button className="bg-nav w-full hover:bg-nav-dark text-white font-semibold py-2 px-4 border border-white rounded-lg">Sign Out</button>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;
