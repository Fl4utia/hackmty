// src/pages/CardPage.tsx
// src/pages/CardPage.tsx
import React from 'react';
import Card from './components/card'; 
import Navbar from './components/navbar';
import Footer from './components/footer';

const Dashboard: React.FC = () => {
  return (
    <div className="relative flex flex-col min-h-screen font-serif">
      <Navbar />

      {/* Flex container for header and code input */}
      <div className="flex justify-between items-center pt-16 px-8">
        <h1 className="text-4xl font-bold">Your Events</h1>

        {/* Code box aligned to the right */}
        <div className="ml-auto bg-white shadow-md rounded-md p-2 flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter Code"
            className="border border-gray-300 rounded-md p-1 mb-2 text-sm w-36"
          />
          <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-colors text-sm">
            Add Code
          </button>
        </div>
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