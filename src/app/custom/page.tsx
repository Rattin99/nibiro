import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomPage from '@/components/custom/CustomPage';

export default function Page() {
  return (
    <>
      <Navbar />
      <CustomPage />
      <Footer />
    </>
  );
}
