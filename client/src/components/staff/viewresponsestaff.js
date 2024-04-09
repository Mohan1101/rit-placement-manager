// ViewResponses.js
import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

function ViewResponses() {
  const { companyname } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      // Fetch responses from the "Feedback" collection for the selected company
      const feedbackDocRef = db.collection('Feedback').doc(companyname);
      const registeredStudentsCollection = feedbackDocRef.collection('registeredstudents');
      const snapshot = await registeredStudentsCollection.get();
      const responsesData = snapshot.docs.map(doc => ({
        rollnumber: doc.id,
        content: doc.data().content,
      }));
      setResponses(responsesData);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className='mt-16 w-full text-center text-2xl font-bold bg-sidenav py-4'>
        Responses for {companyname}
      </h2>
  
        <div className='px-2 -mt-4 responses'>
          <table>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response, index) => (
                <tr key={index} className='response_'>
                  <td>{response.rollnumber}</td>
                  <td>{response.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
    </div>
  );
}

export default ViewResponses;
