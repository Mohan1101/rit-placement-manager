import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import Studentsnav from './studentsnav';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../../firebase';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://rit-placement-manager.vercel.app/students');
        const studentsData = response.data;
        setStudents(studentsData);
        setFilteredStudents(studentsData); // Set initial state of filteredStudents
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedBatch !== '') {
      const filteredData = students.filter(student => student.batch === selectedBatch);
      setFilteredStudents(filteredData);
    } else {
      setFilteredStudents(students); // Reset to all students when no filter is applied
    }
  }, [selectedBatch, students]);

  return (
    <section>
      <Navbar />
      <div className=' mt-16 py-2 '>
        <Studentsnav />
        <div className='flex justify-center gap-4 items-center'>
        <div className="mb-4">
          <label className='font-semibold' htmlFor="batch">Choose Batch: </label>
          <select className= "inputBox" id='batch' name='batch' onChange={handleBatchChange} value={selectedBatch} required>
            <option value="">Select Batch</option>
            {[...Array(10)].map((_, index) => (
              <option key={index} value={2021 + index}>Batch {2021 + index}</option>
            ))}
          </select>
        </div>
        <p className="text-lg font-semibold -mt-4 ">Total Entries: {filteredStudents.length}</p>
        </div>
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
              <th>Resume</th>
              <th>Offer Letter</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.rollnumber}</td>
                <td>{student.batch}</td>
                <td>{student.degree}</td>
                <td>{student.branch}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>
                  <a href={student.resume} target='_blank' rel='noreferrer'>
                    View
                  </a>
                </td>
                <td>
                  <a href={student.offerletter} target='_blank' rel='noreferrer'>
                    View
                  </a>
                </td>
                <td>
                  <Link to={`/staff/students/${student.rollnumber}`} className='text-blue-600 hover:underline'>
                    View
                  </Link>
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
