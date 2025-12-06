import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoriesPage from '@/components/stories/StoriesPage';

export default function Page() {
  return (
    <>
      <Navbar />
      <StoriesPage />
      <Footer />
    </>
  );
}
