import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditEvent() {
    const { eventId } = useParams(); // Get the event ID from URL params
    console.log(eventId);
    const navigate = useNavigate();

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

    useEffect(() => {
        fetchEventData();
    }, []); 
    

    const fetchEventData = async () => {
        try {
            // Fetch event data based on event ID
            const response = await axios.get(`https://rit-placement-manager.vercel.app/events/${eventId}`);
            // Populate form data with fetched event data
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Make a PUT request to update the event
            await axios.put(`https://rit-placement-manager.vercel.app/events/${eventId}`, formData);

            alert('Event updated successfully!');
            navigate('/staff/events');
        } catch (error) {
            alert('Error updating event:', error.message);
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <section>
            <Navbar />
            <h2 className='mt-16 w-full text-center text-2xl font-bold bg-sidenav py-4'>
                Edit Placement Drive
            </h2>
            <div className='flex flex-col mt-2 rounded-lg w-5/6 py-6 mx-40 bg-sidenav items-center justify-center gap-2 pb-20'>
                <form onSubmit={handleSubmit}>
                <div className='flex gap-6 items-center justify-center'>
                   <div className='flex flex-col gap-4 justify-center'>
                        <label className='font-semibold' htmlFor="companyname">Company Name : </label>
                        <input type='text' className= "inputBox" id='companyname' name='companyname' placeholder='companyname' onChange={handleChange} value={formData.companyname} />
                    
                        <label className='font-semibold' htmlFor="batch">Batch : </label>
                        <input type='text' className= "inputBox" id='batch' name='batch' placeholder='Batch' onChange={handleChange} value={formData.batch} />
                   
                        <label  className='font-semibold'htmlFor="branch">Branch : </label>
                        <input type='text' className= "inputBox" id='branch' name='branch' placeholder='Branch' onChange={handleChange} value={formData.branch} />
                   
                        <label className='font-semibold' htmlFor="degree">Degree : </label>
                        <input type='text' className= "inputBox" id='degree' name='degree' placeholder='Degree' onChange={handleChange} value={formData.degree} />
                   
                    
                    </div>
                    <div className='flex flex-col gap-4 justify-center'>
                    <label className='font-semibold' htmlFor="date">Date : </label>
                        <input type='date' className= "inputBox" id='date' name='date' placeholder='Drive Date' onChange={handleChange} value={formData.date} />
                   
                        <label className='font-semibold' htmlFor="role">Role : </label>
                        <input type='text' className= "inputBox" id='role' name='role' placeholder='Role' onChange={handleChange} value={formData.role} /> 

                        <label className='font-semibold' htmlFor="role">CTC Pakage : </label>
                        <input type='number' className= "inputBox" id='ctc' name='ctc' placeholder='CTC' onChange={handleChange} value={formData.ctc} />       
                   
                        <label className='font-semibold' htmlFor="category">Category : </label>
                        <input type='text' className= "inputBox" id='category' name='category' placeholder='Superdream, Dream, Noraml' onChange={handleChange} value={formData.category} />
                    </div>
                    </div>
                    <input  className="cursor-pointer bg-nav mt-6 text-white px-5 py-2.5 rounded-lg"  type='submit' value="Update Event" />
                </form>
            </div>
        </section>
    );
}

export default EditEvent;
