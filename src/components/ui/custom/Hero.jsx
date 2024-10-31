import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center px-6 py-16">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/ph2.jpg" 
          alt="Background" 
          className="w-full h-full object-cover blur-sm opacity-70"
        />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <h1 className="font-extrabold text-[50px] text-blue-900">
          <span className="text-red-500">Discover your next Adventure with AI:</span> Personalized Itineraries at your fingertips
        </h1>
        <p className="text-xl text-slate-800">
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget
        </p>
        <Link to={'/create-trip'}>
          <Button className="mt-5">Get Started, It's free</Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
