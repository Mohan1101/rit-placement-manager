import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import { FaUserCircle } from 'react-icons/fa'

function sign() {
  return (
   <div>
     <Navbar/>

   <div className='flex'>
   <div className='w-2/3 h-screen'>
   <img src='https://firebasestorage.googleapis.com/v0/b/rit-placement.appspot.com/o/assests%2Frit-about.png?alt=media&token=70241d51-4101-4437-879c-cab26c25efab' alt='rit' className='w-full h-full' />
 </div>
 
   <div className="mt-64 bg-sidenav w-1/3 flex h-96 flex-col items-center justify-center rounded-md m-12 border border-2 border-black  shadow-lg">
   
    
   
     <h1 className='mb-12 font-bold text-4xl py-8 text-3xl w-full bg-nav text-white text-center'>  Login as</h1>
      
    <div className='flex gap-8 items-center'>
    <Link to="/staff/signin">
      <div className='flex flex-col gap-4 items-center'>
      <FaUserCircle className='text-8xl text-nav'/>
       <button>Admin</button>
      </div>
    
     </Link>
     <Link to="/student/signin" >
      <div className='flex flex-col gap-4 items-center'>
      <FaUserCircle className='text-8xl text-nav'/>
       <button>Student</button>
      </div>
     </Link>
    </div>
     
 </div>
 
   </div>
   </div>
  )
}

export default sign