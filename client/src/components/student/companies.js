import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
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

        const response = await axios.post('https://rit-placement-manager.vercel.app/apply', {
            rollnumber: rollnumber,
            companyName: companyName,
        });

   

        if (response.status === 200) {
            alert(`Successfully applied for ${companyName}`);
        
        } else if (response.status === 201) {
            alert(`Already applied for ${companyName}`);
    
        } else if (response.status === 400) {
            alert(`Error applying for ${companyName}: ${response.data.message}`);
      
        }
    } catch (error) {
        console.error('Error applying for company:', error);
    }
};


  

  return (
    <div>
      <Navbar />
      <h2 className='mt-16 w-full text-center text-2xl font-bold bg-sidenav py-4'>
        Companies
      </h2>

      
        <div className='upcomingevents mx-32 my-6 p-6 bg-sidenav rounded-lg w-5/6'>
          {events.map((event, index) => (
            <div key={index} className='events_ font-semibold'>
              <p>Company Name: {event.companyname}</p>
              <p>Role: {event.role}, {event.category}</p>
              <p>Degree: {event.degree}</p>
              <p>Batch: {event.batch}</p>
              <p>Branch: {event.branch}</p>
              <p>Drive Date: {moment(event.date).format('DD-MM-YYYY')}</p> {/* Format the date using moment */}
              
              <p>CTC: {event.ctc} LPA</p>
              <button onClick={() => handleApply(event.companyname)}>Apply</button>
            </div>
          ))}
        </div>
  
    </div>
  );
}

export default Companies;
