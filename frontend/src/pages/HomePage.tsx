import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';



const HomePage = () => {
  const navigate = useNavigate();
const navigateEmployeerPage = () => {
  navigate('/employee');
}
  return (
    <div className="w-full h-screen bg-gradient-to-r from-teal-500 to-indigo-600 flex items-center justify-center">
      <div className='text-center'>
        <p className='text-white text-6xl font-serif'>Welcome To Our Company</p>
        <button 
          className='px-4 py-3 mt-6 bg-zinc-600 rounded-md text-white text-2xl font-bold'
          onClick={navigateEmployeerPage}
        >
          Get Started Now
        </button>
      </div>
    </div>
  )
};

export default HomePage