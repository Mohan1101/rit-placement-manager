import React, { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import Navbar from './navbar';

import { useNavigate } from 'react-router-dom';

function FeedbackForm() {
  const { companyname, index } = useParams();
  const [feedbackContent, setFeedbackContent] = useState('');
  useEffect(() => {
    console.log('FeedbackForm component is rendered');
  }, []);

  const navigate = useNavigate();

  const handlePostFeedback = async () => {
    try {
      // Update the feedback content in the "Feedback" collection
      const feedbackDocRef = db.collection('Feedback').doc(companyname);

      //add companyname field to the feedback document
      await feedbackDocRef.set({
        companyname: companyname,
      });
      
     

      // Create a sub-collection "registeredstudents" and update the feedback content
      const registeredStudentsDocRef = feedbackDocRef.collection('registeredstudents').doc(localStorage.getItem('rollnumber'));
      await registeredStudentsDocRef.set({
        content: feedbackContent,
      });

      alert('Feedback posted successfully!');
      navigate('/student/feedback');

    } catch (error) {
      console.error('Error posting feedback:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
      <h2>Feedback for {companyname}</h2>
      <textarea
        value={feedbackContent}
        onChange={(e) => setFeedbackContent(e.target.value)}
        placeholder="Enter your feedback here..."
      ></textarea>
      <br />
      <button onClick={handlePostFeedback}>Post Feedback</button>
      </div>
    </div>
  );
}

export default FeedbackForm;
