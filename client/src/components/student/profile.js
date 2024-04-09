import React, { useEffect, useState } from 'react';
import { firebaseApp } from '../../firebase';
import axios from 'axios';
import Navbar from './navbar';

function Profile() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        offerLetterFile: null,
        resumeFile: null,
        marksheetFile: null,
        marksheet2File: null,
        photo: null,

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
            const response = await axios.get('https://rit-placement-manager.vercel.app/students');
            const students = response.data;
            const studentData = students.find((student) => student.rollnumber === rollnumber);


            return studentData;
        } catch (error) {
            console.error('Error fetching student data from API:', error);
            return null;
        }
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            offerLetterFile: e.target.files[0],
            resumeFile: e.target.files[0],
            marksheetFile: e.target.files[0],
            marksheet2File: e.target.files[0],
            photo: e.target.files[0],
        });
    };

    const handleFileUpload = async () => {
        try {
            const file = formData.offerLetterFile;
            if (file) {
                const downloadURL = await uploadFile(file);
                updateStudentOfferLetter(downloadURL);

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
            await axios.put(`https://rit-placement-manager.vercel.app/students/${storedRollnumber}`, {
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
            await axios.put(`https://rit-placement-manager.vercel.app/students/resume/${storedRollnumber}`, {
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


    const handleMarksheetUpload = async () => {
        try {
            const file = formData.marksheetFile;
            if (file) {
                const downloadURL = await uploadMarksheetFile(file);
                updateMarksheetLink(downloadURL);
                console.log('File uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const uploadMarksheetFile = async (file) => {

        try {
            const storageRef = firebaseApp.storage().ref();
            const fileRef = storageRef.child(`marksheet/${formData.rollnumber}_${file.name}`);
            await fileRef.put(file);
            return await fileRef.getDownloadURL();
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    const updateMarksheetLink = async (downloadURL) => {
        const storedRollnumber = localStorage.getItem('rollnumber');
        try {
            await axios.put(`https://rit-placement-manager.vercel.app/students/marksheet/${storedRollnumber}`, {
                marksheet: downloadURL,
            });
            alert('Student marksheet updated successfully!');
            console.log('Student marksheet updated successfully!');
            // reset the file input
            document.getElementById('marksheetFile').value = '';
        } catch (error) {
            console.error('Error updating student marksheet:', error);
        }
    }

    const handleMarksheet2Upload = async () => {
        try {
            const file = formData.marksheet2File;
            if (file) {
                const downloadURL = await uploadMarksheet2File(file);
                updateMarksheet2Link(downloadURL);
                console.log('File uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const uploadMarksheet2File = async (file) => {

        try {
            const storageRef = firebaseApp.storage().ref();
            const fileRef = storageRef.child(`marksheet2/${formData.rollnumber}_${file.name}`);
            await fileRef.put(file);
            return await fileRef.getDownloadURL();
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    const updateMarksheet2Link = async (downloadURL) => {
        const storedRollnumber = localStorage.getItem('rollnumber');
        try {
            await axios.put(`https://rit-placement-manager.vercel.app/students/marksheet2/${storedRollnumber}`, {
                marksheet2: downloadURL,
            });
            alert('Student marksheet2 updated successfully!');
            console.log('Student marksheet2 updated successfully!');
            // reset the file input
            document.getElementById('marksheet2File').value = '';
        } catch (error) {
            console.error('Error updating student marksheet2:', error);
        }
    }

    const handlePhotoUpload = async () => {
        try {
            const file = formData.photo;
            if (file) {
                const downloadURL = await uploadPhotoFile(file);
                updatePhotoLink(downloadURL);
                console.log('File uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const uploadPhotoFile = async (file) => {
        try {
            const storageRef = firebaseApp.storage().ref();
            const fileRef = storageRef.child(`photo/${formData.rollnumber}_${file.name}`);
            await fileRef.put(file);
            return await fileRef.getDownloadURL();
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    const updatePhotoLink = async (downloadURL) => {
        const storedRollnumber = localStorage.getItem('rollnumber');
        try {
            await axios.put(`https://rit-placement-manager.vercel.app/students/photo/${storedRollnumber}`, {
                photo: downloadURL, // Use 'photo' instead of 'photoFile'
            });
            alert('Student photo updated successfully!');
            console.log('Student photo updated successfully!');
            // reset the file input
            document.getElementById('photo').value = '';
        } catch (error) {
            console.error('Error updating student photo:', error);
        }
    };









    return (
        <div>
            <Navbar />
            <h2 className='mt-16 w-full text-center text-2xl font-bold bg-sidenav py-4'>
                Student Profile
            </h2>
            <div className='flex justify-between mx-32 my-6 p-6 bg-sidenav rounded-lg w-5/6'>

                <div className='w-2/3 events_ font-semibold'>
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
                                <label htmlFor="photo">Photo: </label>
                                <input type='file' id='photo' name='photo' onChange={handleFileChange} required />
                            </div>
                            <button type="button" onClick={handlePhotoUpload}>
                                Upload Photo
                            </button>

                            <div>
                                <label htmlFor="marksheetFile">Marksheet: </label>
                                <input type='file' id='marksheetFile' name='marksheetFile' onChange={handleFileChange} required />
                            </div>
                            <button type="button" onClick={handleMarksheetUpload}>
                                Upload Marksheet
                            </button>

                            <div>
                                <label htmlFor="marksheet2File">Marksheet2: </label>
                                <input type='file' id='marksheet2File' name='marksheet2File' onChange={handleFileChange} required />
                            </div>
                            <button type="button" onClick={handleMarksheet2Upload}>
                                Upload Marksheet2
                            </button>

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
                <div className='w-1/3'>
                {
                    students.map((student, index) => (
                        <img src={student.photo} alt='student photo' className='rounded-full w-52 h-52  bg-center' />
                    ))
                }
            </div>
            </div>

         

        </div>
    );
}

export default Profile;
