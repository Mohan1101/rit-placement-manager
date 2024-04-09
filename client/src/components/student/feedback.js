import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { firebaseApp, db } from '../../firebase';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [registeredCompanies, setRegisteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const rollnumber = localStorage.getItem('rollnumber');
    if (rollnumber) {
      fetchRegisteredCompanies(rollnumber);
    }
  }, []);

  const fetchRegisteredCompanies = async (rollnumber) => {
    try {
      const response = await axios.get('https://rit-placement-manager.vercel.app/students');
      const students = response.data;
      const studentData = students.find((student) => student.rollnumber === rollnumber);

      if (studentData) {
        setRegisteredCompanies(studentData.registered);
        fetchFeedback(studentData.registered);
      }
    } catch (error) {
      console.error('Error fetching registered companies:', error);
    }
  };

  const fetchFeedback = async (registeredCompanies) => {
    try {
      const feedbackPromises = registeredCompanies.map(async (companyname) => {
        const response = await axios.get('https://rit-placement-manager.vercel.app/events');
        const eventData = response.data.find((event) => event.companyname === companyname);

        return {
          companyname: companyname,
          role: eventData ? eventData.role : 'Role not available',
          category: eventData ? eventData.category : 'Category not available',
          degree: eventData ? eventData.degree : 'Degree not available',
          batch: eventData ? eventData.batch : 'Batch not available',
          branch: eventData ? eventData.branch : 'Branch not available',
          date: eventData ? eventData.date : 'Date not available',
        };
      });

      const feedbackResults = await Promise.all(feedbackPromises);
      setFeedbackData(feedbackResults);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  // Filter feedback data based on search term
  const filteredFeedback = feedbackData.filter(feedback =>
    feedback.companyname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <h2 className='mt-16 w-full text-center text-2xl font-bold bg-sidenav py-4'>
        Feedback
      </h2>
      <div className='mx-32 my-6 p-6 bg-sidenav rounded-lg w-5/6'>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by company name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-24 py-4 mb-4"
        />
        <div className='upcomingevents'>
          {filteredFeedback.map((feedback, index) => (
            <div key={index} className='events_'>
              <p>{feedback.companyname}</p>
              <p>{feedback.role}, {feedback.category}</p>
              <p>Degree : {feedback.degree}</p>
              <p>Batch : {feedback.batch}</p>
              <p>Branch : {feedback.branch}</p>
              <p>Drive Date: {feedback.date}</p>
              <Link to={{ pathname: `/student/${feedback.companyname}/${index}/fillout` }}>
                <button>Fill Out</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feedback;
