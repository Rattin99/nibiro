import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopPage from '@/components/shop/ShopPage';

export default function Page() {
  return (
    <>
      <Navbar />
      <ShopPage />
      <Footer />
    </>
  );
}
