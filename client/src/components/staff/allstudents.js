import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import Studentsnav from './studentsnav';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../../firebase';



const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      //fetch using axios from route /students
      const response = await axios.get('https://placementportal.vercel.app/students');
      const studentsData = response.data;
      console.log('Students:', studentsData);
      setStudents(studentsData);
    };

    fetchStudents();
  }, []);

  return (
    <section>
      <Navbar />
      <div className='container'>
        <Studentsnav />

        <h2>Total Students</h2>
        <Link to="/staff/addstudent"><button>Add Student</button></Link>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Batch</th>
              <th>Degree</th>
              <th>Branch</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Offer Letter</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.rollnumber}</td>
                <td>{student.batch}</td>
                <td>{student.degree}</td>
                <td>{student.branch}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>
                  <a href={student.resume} target="_blank" rel="noreferrer">View</a>
                </td>
                <td>
                  {student.offerLetter && student.offerLetter.length > 0 ? (
                    student.offerLetter.map((offer, index) => (
                      <span key={index}>
                        <a href={offer} target="_blank" rel="noreferrer">View</a>
                        {index < student.offerLetter.length - 1 && ', '}
                      </span>
                    ))
                  ) : (
                    'N/A'
                  )}
                </td>

                <td>

                  <button onClick={async () => {
                    try {
                      await axios.delete(`https://placementportal.vercel.app/students/del/${student.rollnumber}`);
                      alert(`Successfully deleted ${student.name}`);
                      window.location.reload();
                    } catch (error) {
                      console.error('Error deleting student:', error);
                    }
                  }}>Delete</button>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllStudents;
