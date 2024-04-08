import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import Studentsnav from './studentsnav';
import { firebaseApp } from '../../firebase';

const Eligible = () => {
  const [eligibleStudents, setEligibleStudents] = useState([]);
  const [cgpaFilter, setCgpaFilter] = useState('');

  useEffect(() => {
    // Fetch eligible students from Firestore
    const fetchEligibleStudents = async () => {
      try {
        const response = await axios.get('https://rit-placement-manager.vercel.app/students');
        const students = response.data;
          // Convert arrearCount and cgpa to numbers
          students.forEach(student => {
            student.arrearCount = parseInt(student.arrearCount);
            student.cgpa = parseFloat(student.cgpa);

        });

        // Filter students based on the condition
        let filteredStudents = students.filter(student => student.cgpa > 8);

        // Apply additional filter based on CGPA input
        if (cgpaFilter !== '') {
          const cgpaFilterValue = parseFloat(cgpaFilter);
          filteredStudents = filteredStudents.filter(student => student.cgpa > cgpaFilterValue);
        }

        setEligibleStudents(filteredStudents);
      } catch (error) {
        console.error('Error fetching eligible students:', error);
      }
    };

    fetchEligibleStudents();
  }, [cgpaFilter]); // Include cgpaFilter in the dependency array to update when the filter changes

  const handleCgpaChange = (e) => {
    // Update the CGPA filter when the input changes
    setCgpaFilter(e.target.value);
  };

  return (
    <div>
      <h1></h1>
      <Navbar />
      <div className='mt-16 px-2'>
        <Studentsnav />
      
       <div className='flex items-center gap-4 justify-center'>
       <div className='font-bold -mt-4'>Filter by CGPA: </div>
      
      <input type='number'  className={'inputBox'}  step='0.01' max='10' value={cgpaFilter} onChange={handleCgpaChange} />
      </div>
        <table className='-mt-1'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Batch</th>
              <th>Degree</th>
              <th>Branch</th>
              <th>CGPA</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {eligibleStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.rollnumber}</td>
                <td>{student.batch}</td>
                <td>{student.degree}</td>
                <td>{student.branch}</td>
                <td>{student.cgpa}</td>
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

export default Eligible;
