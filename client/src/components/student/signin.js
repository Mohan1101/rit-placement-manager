import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { firebaseApp } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleDobChange = (e) => {
        setDob(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const formattedDob = moment(dob, 'DD-MM-YYYY').format('YYYY-MM-DD');

            // Check if the email exists in the "Student" collection
            const studentData = await getStudentData(email);

            if (!studentData) {
                setErrorMessage('Email does not exist.');
                return;
            }

            // If email exists, check if the provided dob matches
            if (studentData.dob === formattedDob) {
                console.log('Login successful!');
                setErrorMessage('');

                // Store rollnumber, email, and role in local storage
                localStorage.setItem('rollnumber', studentData.rollnumber);
                localStorage.setItem('email', email);
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

    const getStudentData = async (email) => {
        // Check if email exists in the /students route in the email field
        const response = await axios.get('https://placementportal.vercel.app/students');
        const studentData = response.data.find((student) => student.email === email);
     
        return studentData;
    };

    return (
        <div className={'mainContainer'}>
            <div className={'signinContainer'}>
                <div className={'titleContainer'}>
                    <div>Login</div>
                </div>

                <br />
                <hr />
                <br />
                <div className={'inputContainer'}>
                    <input
                        type="email"
                        placeholder="Enter your email here"
                        className={'inputBox'}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <label className="errorLabel">{errorMessage}</label>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        type="text"
                        placeholder="Enter your date of birth (dd-mm-yyyy)"
                        className={'inputBox'}
                        value={dob}
                        onChange={handleDobChange}
                    />
                    <label className="errorLabel">{errorMessage}</label>
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
