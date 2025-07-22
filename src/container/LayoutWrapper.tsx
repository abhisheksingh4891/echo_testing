import React from 'react'
import Header from './Header.tsx';
import Footer from './Footer';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (

    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1 mt-4 mb-5">
        <div style={{ minHeight: "110px" }}></div>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default LayoutWrapper