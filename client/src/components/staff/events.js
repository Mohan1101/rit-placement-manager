import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function Events() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Filter events based on search term
  const filteredEvents = events.filter(event =>
    event.companyname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <h2 className='mt-16 w-full text-center text-2xl font-bold bg-sidenav py-4'>
        Upcoming Events
      </h2>
      <div className='mx-32 my-6 p-6 bg-sidenav rounded-lg w-5/6'>
     <div className="flex justify-center gap-4 items-center">
     <input
          type="text"
          placeholder="Search by company name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-24 py-4 mt-4 mb-4"
        />
        <Link to="/staff/addevent">
          <button>Add Event</button>
        </Link>
        </div>
        {/* Search bar */}
        
        <div>
          {filteredEvents.map((event, index) => (
            <div key={index} className='events_ font-semibold'>
              <p>Company Name: {event.companyname}</p>
              <p>Role: {event.role}, {event.category}</p>
              <p>Degree : {event.degree}</p>
              <p>Batch : {event.batch}</p>
              <p>Branch : {event.branch}</p>
              <p>Drive Date: {moment(event.date).format('DD-MM-YYYY')}</p>
              <p>CTC: {event.ctc} LPA</p>
              <div>
                <Link to={`/staff/editevent/${event._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(event.companyname)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
