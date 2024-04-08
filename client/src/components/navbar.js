import React from 'react';

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full bg-nav py-2  px-12 text-3xl bg-nav text-white font-bold flex gap-32 items-center justify-between '>
       <div className='w-36 py-1 h-20'>
            <img src="https://firebasestorage.googleapis.com/v0/b/rit-placement.appspot.com/o/assests%2Fritlogo2.png?alt=media&token=096cd96c-47c4-40de-b2d3-baf87b3e9d60" alt="RIT" className='w-full h-full' />
      </div>

      <span>Rit Placement Manager</span>
     
    </nav>
  );
};

export default Navbar;
