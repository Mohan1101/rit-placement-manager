import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import Studentsnav from './studentsnav';
import { firebaseApp } from '../../firebase';

const Placed = () => {
  const [placedStudents, setPlacedStudents] = useState([]);

  useEffect(() => {
    // Fetch placed students from Firestore
    const fetchPlacedStudents = async () => {
      try {
        const response = await axios.get('https://rit-placement-manager.vercel.app/students');
        const students = response.data;
        setPlacedStudents(students.filter(student => student.placed === 'Yes'));

      } catch (error) {
        console.error('Error fetching placed students:', error);
      }
    };

    fetchPlacedStudents();
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div>
      <h1></h1>
      <Navbar />
      <div className='mt-16 px-2'>
        <Studentsnav />
        <p className="text-lg text-center font-semibold">Total Entries: {placedStudents.length}</p>
        <table className='-mt-1'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Batch</th>
              <th>Degree</th>
              <th>Branch</th>
              <th>Offer Letter</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {placedStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.rollnumber}</td>
                <td>{student.batch}</td>
                <td>{student.degree}</td>
                <td>{student.branch}</td>
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

export default Placed;
