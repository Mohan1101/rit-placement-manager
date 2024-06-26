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

        // Filter students with higherstudies field equal to 'Yes'
        const higherStudiesStudents = students.filter(
          (student) => student.higherstudies === 'Yes'
        );

        setHigherStudiesStudents(higherStudiesStudents);
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
      <Navbar />
      <div className='mt-16 px-2'>
        <Studentsnav />
        <p className="font-semibold text-lg text-center">Total Entries: {higherStudiesStudents.length}</p>
        <table className='-mt-1'>
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
