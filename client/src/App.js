
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


import Signout from './components/sign/signout';

import Sign from './components/sign';
import StaffSignin from './components/staff/signin';
import StudentSignin from './components/student/signin';

import Students from './components/staff/students';
import AddStudent from './components/staff/addstudent';
import Events from './components/staff/events';
import Addevent from './components/staff/addevent';
import EditEvent from './components/staff/editevent';
import AllStudents from './components/staff/allstudents';
import Registeredstudents from './components/staff/registeredstudents';
import Placed from './components/staff/placed';
import Eligible from './components/staff/eligible';
import Higherstudies from './components/staff/higherstudies';
import StaffFeedback from './components/staff/feedback';
import AddFeedback from './components/staff/feedback';
import FeedbackForm from './components/student/feedbackform';
import ViewResponseStaff from './components/staff/viewresponsestaff'; 
import ViewResponseStudent from './components/student/viewresposestudent';

import Profile from './components/student/profile';
import Companies from './components/student/companies';
import StudentFeedback from './components/student/feedback';
import Review from './components/student/review';

function App() {
 
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Sign />}></Route>
           
           
           
         

          <Route path="/staff/signin" element={<StaffSignin />}></Route>
          <Route path="/student/signin" element={<StudentSignin />}></Route>
          <Route path="/signout" element={<Signout />}></Route>

          <Route path="/staff" element={<Students />}></Route>
          <Route path="/staff/students" element={<Students />}></Route>
          <Route path="/staff/addstudent" element={<AddStudent />}></Route>
          <Route path="/staff/events" element={<Events />}></Route>
          <Route path="/staff/addevent" element={<Addevent />}></Route>
          <Route path="/staff/editevent/:eventId" element={<EditEvent />}></Route>
          <Route path="/staff/feedback" element={<StaffFeedback />}></Route>
          <Route path="/staff/addfeedback" element={<StaffFeedback />}></Route>
          <Route path="/staff/allstudents" element={<AllStudents />}></Route>
          <Route path="/staff/registeredstudents" element={<Registeredstudents />}></Route>
          <Route path="/staff/placedstudents" element={<Placed />}></Route>
          <Route path="/staff/eligiblestudents" element={<Eligible />}></Route>
          <Route path="/staff/higherstudies" element={<Higherstudies />}></Route>
          <Route path="/staff/view/:companyname" element={<ViewResponseStaff />} />

          <Route path="/student" element={<Profile />}></Route>
          <Route path="/student/events" element={<Events />}></Route>
          <Route path="/student/feedback" element={<StudentFeedback />}></Route>
          <Route path="/student/profile" element={<Profile />}></Route>
          <Route path="/student/companies" element={<Companies />}></Route>
          <Route path="/student/review" element={<Review />}></Route>
          <Route path="/student/:companyname/:index/fillout" element={<FeedbackForm />} />
          <Route path="/student/view/:companyname" element={<ViewResponseStudent />} />
         

         
      </Routes>
    </Router>
  );
}

export default App;
