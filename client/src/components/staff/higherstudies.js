import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import Studentsnav from './studentsnav';
import { firebaseApp } from '../../firebase';
const Higherstudies = () => {
  const [higherStudiesStudents, setHigherStudiesStudents] = useState([]);

  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rit-placement-manager.vercel.app/students');
        const students = response.data;

        // get students with higherstudies field equal to 'Yes'
        const higherStudiesStudents = students.filter(
          (student) => student.higherstudies === 'Yes'
        );
        
        setHigherStudiesStudents(higherStudiesStudents);

        console.log('studentsData:', higherStudiesStudents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <h1></h1>
      <Navbar/>
      <div className='container'>
        <Studentsnav/>
        <h2>Higher Studies</h2>
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
            </tr>
          </thead>
          <tbody>
            {higherStudiesStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.rollnumber}</td>
                <td>{student.batch}</td>
                <td>{student.degree}</td>
                <td>{student.branch}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Higherstudies;
