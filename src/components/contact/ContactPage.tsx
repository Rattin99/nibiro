"use client";
import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import BengaliBackground from '../BengaliBackground';

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-neutral-50 isolate">
      <div className="fixed inset-0 bg-neutral-50 -z-20"></div>
      <BengaliBackground />
      
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-6 font-montserrat tracking-tighter leading-tight text-transparent"
             style={{ WebkitTextStroke: '2px black' }}
          >
            GET IN <br className="md:hidden" />
            <span className="relative inline-block px-4 py-2">
              <span className="absolute inset-0 bg-blue-400 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></span>
              <span className="relative z-10 text-black">TOUCH</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto font-medium">
            Project inquiries, custom requests, or just wanna say hi?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
           {/* Left Column: Contact Form */}
           <div className="w-full">
             <ContactForm />
           </div>

           {/* Right Column: Info & Map */}
           <div className="w-full">
             <ContactInfo />
           </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
