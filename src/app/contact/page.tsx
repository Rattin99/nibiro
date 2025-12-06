import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactPage from '@/components/contact/ContactPage';

export default function Page() {
  return (
    <>
      <Navbar />
      <ContactPage />
      <Footer />
    </>
  );
}
