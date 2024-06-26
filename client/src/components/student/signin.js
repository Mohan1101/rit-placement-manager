import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Navbar from '../navbar';
import { firebaseApp } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [rollnumber, setRollnumber] = useState('');
    const [dob, setDob] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRollnumberChange = (e) => {
        setRollnumber(e.target.value);
    };

    const handleDobChange = (e) => {
        setDob(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        try {
     

            // Check if the rollnumber exists in the "Student" collection
            const studentData = await getStudentData(rollnumber);

            if (!studentData) {
                setErrorMessage('Rollnumber does not exist.');
                return;
            }

            // If rollnumber exists, check if the provided dob matches
            if (studentData.dob === dob) {
                console.log('Login successful!');
                setErrorMessage('');

                // Store rollnumber, email, and role in local storage
                localStorage.setItem('rollnumber', rollnumber);
                localStorage.setItem('email', studentData.email);
                localStorage.setItem('userRole', 'student');

                // Navigate to /student after successful login
                navigate('/student');
            } else {
                setErrorMessage('Incorrect date of birth. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Error logging in. Please try again.');
        }
    };

    const getStudentData = async (rollnumber) => {
        // Check if rollnumber exists in the /students route
        const response = await axios.get('https://rit-placement-manager.vercel.app/students');
        const studentData = response.data.find((student) => student.rollnumber === rollnumber);
     
        return studentData;
    };

    return (
        <div className={'mainContainer'}>
            <Navbar />
            <div className={'signinContainer  bg-sidenav'}>
                <div className={'titleContainer'}>
                    Student Login
                </div>

                <br />
                <hr />

                <div className={'inputContainer'}>
                <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your rollnumber here"
                        className={'inputBox'}
                        value={rollnumber}
                        onChange={handleRollnumberChange}
                        onKeyPress={handleKeyPress}
                    />
                    <label className="errorLabel">{errorMessage}</label>
                </div>
                <br />
                <div className={'inputContainer'}>
                <label htmlFor="dob">Password</label>
                    <input
                        type="text"
                        placeholder="Enter your date of birth (dd-mm-yyyy)"
                        className={'inputBox'}
                        value={dob}
                        onChange={handleDobChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        type="button"
                        className={'loginButton'}
                        value={'Log in'}
                        onClick={handleLogin}
                    />
                </div>
            </div>
        </div>
    );
}

export default SignIn;
