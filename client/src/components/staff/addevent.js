import React, { useState } from 'react';
import Navbar from './navbar';
import  axios  from 'axios';
import { firebaseApp } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Addevent() {
    const [formData, setFormData] = useState({
        companyname: '',
        degree: '',
        batch: '',
        branch: '',
        role: '',
        date: '',
        category: '',
        ctc: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Make a POST request to your server endpoint
            await axios.post('https://rit-placement-manager.vercel.app/events/add', formData);

            alert('Event added successfully!');
            navigate('/staff/events');
        } catch (error) {
            alert('Error adding event:', error.message);
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <section>
            <Navbar />
            <h2 className='w-full text-center text-2xl font-bold bg-sidenav py-4 '>
                    Add Placement Drive</h2>
            <div className='mx-32 my-6 p-6 bg-sidenav rounded-lg w-5/6'>
           
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-4 justify-center'>
                        <label className='font-semibold' htmlFor="companyname">Company Name : </label>
                        <input type='text' className= "inputBox" id='companyname' name='companyname' placeholder='companyname' onChange={handleChange} value={formData.companyname} />
                    
                        <label className='font-semibold' htmlFor="batch">Batch : </label>
                        <input type='text' className= "inputBox" id='batch' name='batch' placeholder='Batch' onChange={handleChange} value={formData.batch} />
                   
                        <label  className='font-semibold'htmlFor="branch">Branch : </label>
                        <input type='text' className= "inputBox" id='branch' name='branch' placeholder='Branch' onChange={handleChange} value={formData.branch} />
                   
                        <label className='font-semibold' htmlFor="degree">Degree : </label>
                        <input type='text' className= "inputBox" id='degree' name='degree' placeholder='Degree' onChange={handleChange} value={formData.degree} />
                   
                        <label className='font-semibold' htmlFor="date">Date : </label>
                        <input type='date' className= "inputBox" id='date' name='date' placeholder='Drive Date' onChange={handleChange} value={formData.date} />
                   
                        <label className='font-semibold' htmlFor="role">Role : </label>
                        <input type='text' className= "inputBox" id='role' name='role' placeholder='Role' onChange={handleChange} value={formData.role} /> 

                        <label className='font-semibold' htmlFor="role">CTC Pakage : </label>
                        <input type='number' className= "inputBox" id='ctc' name='ctc' placeholder='CTC' onChange={handleChange} value={formData.ctc} />       
                   
                        <label className='font-semibold' htmlFor="category">Category : </label>
                        <input type='text' className= "inputBox" id='category' name='category' placeholder='Superdream, Dream, Noraml' onChange={handleChange} value={formData.category} />
                    </div>
                    <input type='submit' value="Add Event" />
                </form>
            </div>
        </section>
    )
}

export default Addevent