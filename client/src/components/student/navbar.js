import React, { useEffect, useState } from 'react';
import { firebaseApp } from '../../firebase';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Dashboard() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const storedRollnumber = localStorage.getItem('rollnumber');
      
        if (storedRollnumber) {
            fetchStudentProfile(storedRollnumber);
        }
    }, []);

    const fetchStudentProfile = async (rollnumber) => {
        try {
            const studentData = await getStudentData(rollnumber);
            setStudents([studentData]);
         
        } catch (error) {
            console.error('Error fetching student profile:', error);
        }
    };

    const getStudentData = async (rollnumber) => {
      try {
          const studentDoc = await firebaseApp.firestore().collection('Student').doc(rollnumber).get();
  
          if (studentDoc.exists) {
              const studentData = studentDoc.data();
            
              return studentData;
          } else {
              console.log('Student not found in Firestore.');
              return null;
          }
      } catch (error) {
          console.error('Error fetching student data from Firestore:', error);
          return null;
      }
    };
    return (
       <div>
         <div>
            <div className='topnav'>
                <h1>CDP</h1>
                <div>
                    <h2>Welcome <span >{students[0]?.name}
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
