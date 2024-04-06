import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import { firebaseApp, db } from '../../firebase';

function Feedback() {
  const [events, setEvents] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
  
    fetchFeedback();
  }, []);



  const fetchFeedback = async () => {
    try {
      const feedbackCollection = db.collection('Feedback');
      const snapshot = await feedbackCollection.get();
      const feedbackData = snapshot.docs.map(doc => doc.data());
      console.log('Feedback:', feedbackData);
      setFeedbackData(feedbackData);
      console.log('Feedback:', feedbackData);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };



  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1>Review</h1>
        <br/><br/>
        
        <div className='upcomingevents'>
  
          {feedbackData.map((feedback, index) => (
            <div key={index} className='events_'>
              <p>Company Name: {feedback.companyname}</p>
              <Link to={`/student/view/${feedback.companyname}`}><button>View</button></Link>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feedback;
