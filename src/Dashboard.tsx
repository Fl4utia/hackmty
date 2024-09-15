// src/pages/CardPage.tsx
// src/pages/CardPage.tsx
import React, { useEffect, useState } from "react";
import Card from "./components/card";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { useAuth } from "@clerk/clerk-react";
import { existsUser } from "./api/clerk.js";

const Dashboard: React.FC = () => {
  const { userId } = useAuth(); // Fetch the current session (token) from Clerk

  useEffect(() => {
    if (userId) {
      console.log("Fetching user data for user ID:", userId);
      const fetchData = async () => {
        try {
          const data = await existsUser(userId);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }
  }, [userId]);
  return (
    <div className="relative flex flex-col min-h-screen font-serif">
      <Navbar />

      {/* Flex container for header, plus icon, and code input */}
      <div className="flex justify-between items-center pt-16 px-8">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold">Your Events</h1>
          {/* Plus icon for redirection */}
          <a
            href="/add-event"
            className="ml-4 text-blue-500 hover:text-blue-700 text-4xl font-bold"
          >
            +
          </a>
        </div>

        {/* Code box aligned to the right */}
        <div className="ml-auto bg-white shadow-md rounded-md p-2 flex flex-col items-center pt-6">
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
          <Card title="Marias Wedding" author="Celeste Mills" isPaid={true} />
          <Card title="Johns Graduation" author="John Doe" isPaid={false} />
          {/* Add more Card components as needed */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
