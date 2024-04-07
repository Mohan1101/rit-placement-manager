import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Dashboard() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const storedRollnumber = localStorage.getItem('rollnumber');
        if (storedRollnumber) {
            getStudentName(storedRollnumber);
        }
    }, []);

    const getStudentName = async (rollnumber) => {
        try {
            const response = await axios.get('http://localhost:3001/students');
            const students = response.data;
            const studentData = students.find((student) => student.rollnumber === rollnumber);
       
            setStudents([studentData]);
        } catch (error) {
            console.error('Error fetching student data from Firestore:', error);
        }
    };
      
    return (
       <div>
         <div>
            <div className='topnav'>
                <h1>CDP</h1>
                <div>
                    <h2>Welcome <span>
                    {students.map((student) => (
                        <span key={student.rollnumber}>{student.name}</span>
                    ))}

                        </span></h2>
                </div>
            </div>
        </div>
        
            <div className="sidenav">
                <Link to="/student/profile"><button>Profile</button></Link>
                <Link to="/student/companies"><button>Companies</button></Link>
                <Link to="/student/feedback"><button>Feedback</button></Link>
                <Link to="/student/review"><button>Review</button></Link>
                <Link to="/signout"><button>Sign Out</button></Link>
            </div>
       </div>
    )
}

export default Dashboard
