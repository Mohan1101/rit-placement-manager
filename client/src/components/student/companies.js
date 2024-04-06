import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { firebaseApp, db } from '../../firebase';

function Companies() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://rit-placement-manager.vercel.app/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleApply = async (companyName) => {
    try {
        const rollnumber = localStorage.getItem('rollnumber');
        console.log('Rollnumber:', rollnumber);
        console.log('Company:', companyName);

        const response = await axios.post('https://rit-placement-manager.vercel.app/apply', {
            rollnumber: rollnumber,
            companyName: companyName,
        });

   

        if (response.status === 200) {
            alert(`Successfully applied for ${companyName}`);
            console.log(`Successfully applied for ${companyName}`);
        } else if (response.status === 201) {
            alert(`Already applied for ${companyName}`);
            console.log(`Already applied for ${companyName}`);
        } else if (response.status === 400) {
            alert(`Error applying for ${companyName}: ${response.data.message}`);
            console.error(`Error applying for ${companyName}:`, response.data.message);
        }
    } catch (error) {
        console.error('Error applying for company:', error);
    }
};


  

  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1>Companies</h1>
        <br /><br />
        <div className='upcomingevents'>
          {events.map((event, index) => (
            <div key={index} className='events_'>
              <p>{event.companyname}</p>
              <p>{event.role}, {event.category}</p>
              <p>Degree: {event.degree}</p>
              <p>Batch: {event.batch}</p>
              <p>Branch: {event.branch}</p>
              <p>Drive Date: {event.date}</p>
              <button onClick={() => handleApply(event.companyname)}>Apply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Companies;
