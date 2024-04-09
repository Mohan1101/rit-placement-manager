import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import { firebaseApp, db } from '../../firebase';

function Feedback() {
  const [events, setEvents] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const feedbackCollection = db.collection('Feedback');
      const snapshot = await feedbackCollection.get();
      const feedbackData = snapshot.docs.map(doc => doc.data());
      setFeedbackData(feedbackData);
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
        Review
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
            <div key={index} className='events_ font-semibold'>
              <p>Company Name: {feedback.companyname}</p>
              <Link to={`/student/view/${feedback.companyname}`}>
                <button>View</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feedback;
