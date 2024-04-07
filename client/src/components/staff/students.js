import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Studentsnav from './studentsnav';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../../firebase';

const Students = () => {
  

  return (
    <div>
      <Navbar/>
      <div className='bg-sidenav'>
        <Studentsnav/>
      </div>
    </div>
  );
};

export default Students;
