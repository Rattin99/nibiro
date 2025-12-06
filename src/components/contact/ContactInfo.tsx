import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaDiscord, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 gap-6">
        <a href="mailto:contact@nibiro.org" className="group block">
          <div className="bg-blue-50 border-2 border-black rounded-xl p-6 flex items-center gap-6 transition-all duration-300 hover:bg-blue-100 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-16 h-16 bg-blue-500 rounded-lg border-2 border-black flex items-center justify-center text-white text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform">
              <FaEnvelope />
            </div>
            <div>
              <h4 className="font-bold text-neutral-500 uppercase text-xs tracking-wider mb-1">Email Us</h4>
              <p className="font-black text-xl md:text-2xl font-montserrat">contact@nibiro.org</p>
            </div>
          </div>
        </a>

        <a href="tel:+8801234567890" className="group block">
          <div className="bg-green-50 border-2 border-black rounded-xl p-6 flex items-center gap-6 transition-all duration-300 hover:bg-green-100 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-16 h-16 bg-green-500 rounded-lg border-2 border-black flex items-center justify-center text-white text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:-rotate-6 transition-transform">
              <FaPhone />
            </div>
            <div>
              <h4 className="font-bold text-neutral-500 uppercase text-xs tracking-wider mb-1">Call Us</h4>
              <p className="font-black text-xl md:text-2xl font-montserrat">+880 1234 567 890</p>
            </div>
          </div>
        </a>
      </div>

      {/* Location Card */}
      <div className="bg-white border-2 border-black rounded-xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-4 mb-6">
           <div className="w-10 h-10 bg-red-500 rounded-full border-2 border-black flex items-center justify-center text-white">
             <FaMapMarkerAlt />
           </div>
           <h3 className="text-2xl font-black font-montserrat">HQ Coordinates</h3>
        </div>
        
        <p className="text-lg font-medium text-neutral-700 leading-relaxed mb-6">
          House 42, Road 13/A,<br />
          Block D, Banani,<br />
          Dhaka 1213, Bangladesh
        </p>

        {/* Pseudo Map placeholder */}
        <div className="w-full h-48 bg-neutral-200 border-2 border-black rounded-lg relative overflow-hidden group cursor-pointer">
           <div className="absolute inset-0 flex items-center justify-center bg-neutral-300 group-hover:bg-neutral-200 transition-colors">
              <span className="font-mono text-neutral-500 font-bold">[ Map View Unavailable in Offline Mode ]</span>
           </div>
           {/* Map Marker Pin */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-red-600 text-4xl drop-shadow-md group-hover:animate-bounce">
             <FaMapMarkerAlt />
           </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-between gap-4">
        <a href="#" className="flex-1 bg-black text-white py-4 rounded-xl border-2 border-transparent hover:bg-white hover:text-black hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex justify-center items-center text-2xl">
          <FaDiscord />
        </a>
        <a href="#" className="flex-1 bg-black text-white py-4 rounded-xl border-2 border-transparent hover:bg-white hover:text-black hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex justify-center items-center text-2xl">
          <FaTwitter />
        </a>
        <a href="#" className="flex-1 bg-black text-white py-4 rounded-xl border-2 border-transparent hover:bg-white hover:text-black hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex justify-center items-center text-2xl">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
