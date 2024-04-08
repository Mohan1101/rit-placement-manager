import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import Studentsnav from './studentsnav';
import { db } from '../../firebase';

const Registered = () => {
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    // Fetch registered students and unique company names when the component mounts
    fetchRegisteredStudents();
    fetchCompanyNames();
  }, []);

  const fetchRegisteredStudents = async () => {
    try {
      // Fetch students where the registered field is not empty
      const response = await axios.get('https://rit-placement-manager.vercel.app/students');
      const studentsData = response.data.filter(student => student.registered.length > 0);

      setRegisteredStudents(studentsData);
    } catch (error) {
      console.error('Error fetching registered students:', error);
    }
  };

  const fetchCompanyNames = async () => {
    try {
      // Fetch unique company names from the event in mongodb
      const response = await axios .get('https://rit-placement-manager.vercel.app/events');
      const eventsData = response.data;
      const uniqueCompanyNames = [...new Set(eventsData.map(event => event.companyname))];
      setCompanyNames(uniqueCompanyNames);
     
    } catch (error) {
      console.error('Error fetching company names:', error);
    }
  };

  const handleCompanyChange = (e) => {
    // Update the selected company when the dropdown changes
    setSelectedCompany(e.target.value);
  };

  const filterStudentsByCompany = () => {
    // Filter the registered students based on the selected company name
    if (selectedCompany) {
      return registeredStudents.filter(student => student.registered.includes(selectedCompany));
    }
    return registeredStudents;
  };

  const filteredStudents = filterStudentsByCompany();

  return (
    <div>
      <Navbar />
      <div className='mt-16 px-2'>
        <Studentsnav />
        <div className='flex gap-4 items-center justify-center'>
        <div className='font-bold -mt-3 '>Filter by Company : </div>
        <select  className={'inputBox'} value={selectedCompany} onChange={handleCompanyChange}>
          <option value="" disabled>Select a company</option>
          {companyNames.map((company, index) => (
            <option key={index} value={company}>{company}</option>
          ))}
        </select>
        </div>
        <table className='-mt-2'>
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
            {filteredStudents.map((student, index) => (
              <tr key={index}>
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

export default Registered;
