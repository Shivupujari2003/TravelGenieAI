import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 py-6 mt-5">
      <div className="text-center text-white">
        <h2 className="font-bold text-lg">Created By Shivaraj | KP</h2>
        <p className="text-sm mt-1">AI-travel planner App</p>

        <div className="mt-3">
          <h3 className="text-sm font-semibold">Contact Me</h3>
          <a
            href="mailto:shivu.kp.333@gmail.com"
            className="text-gray-300 hover:text-white text-sm"
          >
            shivu.kp.333@gmail.com
          </a>
        </div>

        <div className="flex justify-center space-x-4 mt-3">
          <a href="https://www.instagram.com/shivu_sp_33/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-white w-6 h-6 hover:text-pink-400" />
          </a>
          <a href="https://www.linkedin.com/in/shivraj-kp-9920bb255/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="text-white w-6 h-6 hover:text-blue-400" />
          </a>
          <a href="https://github.com/Shivupujari2003" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="text-white w-6 h-6 hover:text-green-400" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
