import React, { useEffect, useState } from 'react';
import { firebaseApp } from '../../firebase';
import axios from 'axios';
import Navbar from './navbar';

function Profile() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        offerLetterFile: null,
    });

    useEffect(() => {
        const storedRollnumber = localStorage.getItem('rollnumber');
        console.log('Stored Rollnumber:', storedRollnumber);
        if (storedRollnumber) {
            fetchStudentProfile(storedRollnumber);
        }
    }, []);

    const fetchStudentProfile = async (rollnumber) => {
        try {
            const studentData = await getStudentData(rollnumber);
            setStudents([studentData]);
            console.log('Student Profile:', studentData);
        } catch (error) {
            console.error('Error fetching student profile:', error);
        }
    };

    const getStudentData = async (rollnumber) => {
        try {
            const response = await axios.get('https://placementportal.vercel.app/students');
            const students = response.data;
            const studentData = students.find((student) => student.rollnumber === rollnumber);
          
            return studentData;
        } catch (error) {
            console.error('Error fetching student data from Firestore:', error);
            return null;
        }
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            offerLetterFile: e.target.files[0],
            resumeFile: e.target.files[0],
        });
    };

    const handleFileUpload = async () => {
        try {
            const file = formData.offerLetterFile;
            if (file) {
                const downloadURL = await uploadFile(file);
                updateStudentOfferLetter(downloadURL);
                console.log('File uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    const uploadFile = async (file) => {
        try {
            const storageRef = firebaseApp.storage().ref();
            const fileRef = storageRef.child(`offerletter/${formData.rollnumber}_${file.name}`);
            await fileRef.put(file);
            return await fileRef.getDownloadURL();
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    const updateStudentOfferLetter = async (downloadURL) => {
        const storedRollnumber = localStorage.getItem('rollnumber');
        try {
            await axios.put(`https://placementportal.vercel.app/students/${storedRollnumber}`, {
                offerLetter: downloadURL,
            });
            alert('Student offer letter updated successfully!');
            console.log('Student offer letter updated successfully!');
            // reset the file input
            document.getElementById('offerLetterFile').value = '';

            

        } catch (error) {
            console.error('Error updating student offer letter:', error);
        }
    };

    const handleResumeUpload = async () => {
     

        try {
            const file = formData.offerLetterFile;
            if (file) {
                const downloadURL = await uploadResumeFile(file);
                updateResumeLink(downloadURL);
                console.log('File uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    
    const uploadResumeFile = async (file) => {
        try {
            const storageRef = firebaseApp.storage().ref();
            const fileRef = storageRef.child(`resume/${formData.rollnumber}_${file.name}`);
            await fileRef.put(file);
            return await fileRef.getDownloadURL();
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    const updateResumeLink = async (downloadURL) => {
        const storedRollnumber = localStorage.getItem('rollnumber');
        try {
            await axios.put(`https://placementportal.vercel.app/students/resume/${storedRollnumber}`, {
                resume: downloadURL,
            });
            alert('Student resume updated successfully!');
            console.log('Student resume updated successfully!');
            // reset the file input
            document.getElementById('resumeFile').value = '';
        } catch (error) {
            console.error('Error updating student resume:', error);
        }
    }



    
    
    

    return (
        <div>
            <Navbar />
            <div className='container'>
                <h2>Student Profile</h2>
                <div className='events_'>
                    {students.map((student, index) => (
                        <div key={index}>
                            <p>Name : {student.name}</p>
                            <p>Roll Number : {student.rollnumber}</p>
                            <p>Batch : {student.batch}</p>
                            <p>Degree : {student.degree}</p>
                            <p>Branch : {student.branch}</p>
                            <p>Phone : {student.phone}</p>
                            <p>Email : {student.email}</p>
                            <div>
                                <label htmlFor="offerLetterFile">Offer Letter: </label>
                                <input type='file' id='offerLetterFile' name='offerLetterFile' onChange={handleFileChange} required />
                            </div>
                            <button type="button" onClick={handleFileUpload}>
                                Upload Offer Letter
                            </button>
                            <div>
                                <label htmlFor="resumeFile">Resume: </label>
                                <input type='file' id='resumeFile' name='resumeFile' onChange={handleFileChange} required />
                            </div>
                            <button type="button" onClick={handleResumeUpload}>
                                Upload Resume
                            </button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
