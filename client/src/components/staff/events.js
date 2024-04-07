import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

function Events() {
  const [events, setEvents] = useState([]);

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

  const handleDelete = async (companyName) => {
    try {
      await axios.delete(`https://rit-placement-manager.vercel.app/events/${companyName}`);
      alert(`Successfully deleted ${companyName}`);
      // Fetch updated events data after deleting
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
 
  return (
    <div>
      <Navbar />
      <h2 className='w-full text-center text-2xl font-bold bg-sidenav py-4 '>
      Upcoming Events</h2>
      <div className='mx-32 my-6 p-6 bg-sidenav rounded-lg w-5/6'>
       
        <Link to="/staff/addevent">
          <button>Add Event</button>
        </Link>
     
        <div>
  {events.map((event, index) => (
    <div key={index} className='events_ '>
      <p>{event.companyname}</p>
      <p>{event.role}, {event.category}</p>
      <p>Degree : {event.degree}</p>
      <p>Batch : {event.batch}</p>
      <p>Branch : {event.branch}</p>
      <p>Drive Date: {event.date}</p>
      <button onClick={() => handleDelete(event.companyname)}>Delete</button>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}

export default Events;
