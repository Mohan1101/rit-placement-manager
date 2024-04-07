import React, { useState } from 'react';
import { firebaseApp } from '../../firebase';
import axios from 'axios';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
    const [formData, setFormData] = useState({
        name: '',
        rollnumber: '',
        email: '',
        fathername: '',
        dob: '',
        batch: '',
        branch: '',
        cgpa: '',
        phone: '',
        degree: '',
        placed: '',
        registered: [],
        resume: '',
        higherstudies: '',
        resumeFile: null,
        resumeDownloadLink: '',
        arrearCount: '',
        marsheet: '',
        marksheet2: '',
    });
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          
                const studentData = {
                    name: formData.name,
                    rollnumber: formData.rollnumber,
                    email: formData.email,
                    fathername: formData.fathername,
                    dob: formData.dob,
                    batch: formData.batch,
                    branch: formData.branch,
                    cgpa: formData.cgpa,
                    phone: formData.phone,
                    degree: formData.degree,
                    placed: formData.placed,
                    registered: [],
                    resume: '', 
                    higherstudies: formData.higherstudies,
                    arrearCount: formData.arrearCount,
                    marksheet: '',
                    marksheet2: '',
                }

                // Send a POST request to your server with the studentData
                await axios.post('https://rit-placement-manager.vercel.app/students/add', studentData);
                
                alert('Student added successfully!');
                navigate('/staff/students');
                console.log('Data uploaded successfully!');
            
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };
    

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <section>
            <Navbar/>
            <div className='flex flex-col items-center justify-center gap-2 pb-20'>
                <h2 className='w-full text-center text-2xl font-bold bg-sidenav py-4 '>
                    Add Student</h2>
                <form onSubmit={handleSubmit} >
                    <div className='flex gap-6 '>
                    <div className='flex flex-col gap-4 justify-center '>
                        <label className='font-semibold' htmlFor="name">Student Name : </label>
                        <input type='text' className= "inputBox" id='name' name='name' placeholder='Name' onChange={handleChange} value={formData.name} required />
                        <label className='font-semibold'htmlFor="rollnumber">Roll Number : </label>
                        <input type='text' className= "inputBox" id='rollnumber' name='rollnumber' placeholder='Roll Number' onChange={handleChange} value={formData.rollnumber} required />
                        <label className='font-semibold' htmlFor="email">Email : </label>
                        <input type='email' className= "inputBox" id='email' name='email' placeholder='Email' onChange={handleChange} value={formData.email} required />
                        <label className='font-semibold' htmlFor="fathername">Father's Name : </label>
                        <input type='text' className= "inputBox" id='fathername' name='fathername' placeholder="Father's Name" onChange={handleChange} value={formData.fathername} required />
                        <label className='font-semibold' htmlFor="dob">Date of Birth : </label>
                        <input type='date'  className= "inputBox" id='dob' name='dob' onChange={handleChange} value={formData.dob} required />
        
                        <label className='font-semibold' htmlFor="batch">Batch : </label>
                        <input type='text' className= "inputBox" id='batch' name='batch' placeholder='Batch' onChange={handleChange} value={formData.batch} required />
                  
                        <label className='font-semibold' htmlFor="branch">Branch : </label>
                        <input type='text' className= "inputBox" id='branch' name='branch' placeholder='Branch' onChange={handleChange} value={formData.branch} required />
                    </div>
                  
                    <div className='flex flex-col gap-4 justify-center '>
                        
               
                       
               
                        <label className='font-semibold' htmlFor="cgpa">CGPA : </label>
                        <input type='text' className= "inputBox" id='cgpa' name='cgpa' placeholder='CGPA' onChange={handleChange} value={formData.cgpa} required />
              
                        <label className='font-semibold' htmlFor="arrearCount">Arrear Count : </label>
                        <input type='text' className= "inputBox" id='arrearCount' name='arrearCount' placeholder='Arrear Count' onChange={handleChange} value={formData.arrearCount} required/>
               
                        <label className='font-semibold' htmlFor="phone">Phone : </label>
                        <input type='tel' className= "inputBox" id='phone' name='phone' placeholder='Phone' onChange={handleChange} value={formData.phone} />
               
                        <label className='font-semibold' htmlFor="degree">Degree : </label>
                        <input type='text' className= "inputBox" id='degree' name='degree' placeholder='Degree' onChange={handleChange} value={formData.degree} required/>
                
                        <label className='font-semibold' htmlFor="higherstudies">Higher Studies: </label>
                        <select className= "inputBox" id="higherstudies" name="higherstudies" onChange={handleChange} value={formData.higherstudies} required>
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                 
                        <label className='font-semibold' htmlFor="placed">Placed: </label>
                        <select id="placed" className= "inputBox" name="placed" onChange={handleChange} value={formData.placed} required>
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    </div>
                  
                
                    <input className="bg-nav mt-6 text-white px-5 py-2.5 rounded-lg" type='submit' value="Submit" />
                </form>
            </div>
        </section>
    )
}

export default AddStudent;
