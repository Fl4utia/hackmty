// src/pages/CardPage.tsx
// src/pages/CardPage.tsx
import React from 'react';
import Card from './components/card'; 
import Navbar from './components/navbar';
import Footer from './components/footer';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-serif">
      <Navbar />
      <div className='pt-8'>
        <h1 className="text-4xl font-bold text-center pt-9">Your Events</h1>
      </div>
      <main className="flex-grow pt-12 pb-8 px-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card 
            title="Marias Wedding" 
            author="Celeste Mills" 
            isPaid={true}
          />
          <Card 
            title="Johns Graduation" 
            author="John Doe" 
            isPaid={false}
          />
          {/* Add more Card components as needed */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;