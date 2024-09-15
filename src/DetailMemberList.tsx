import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { useAuth } from "@clerk/clerk-react";

interface Product {
  _id: string;
  name: string;
  units: number;
  price: number;
  paid: boolean;
}

interface User {
  _id: string;
  clerkUserId: string;
  name: string;
  publicaciones: any[];
  balance: number;
}

interface Member {
  user: User;
  paid: number;
  _id: string;
}

interface Event {
  _id: string;
  name: string;
  start_date: string;
  end_date: string;
  products: Product[];
  equitative: boolean;
  admin: User;
  members: Member[];
  total: number;
}

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();
  const navigate = useNavigate();

  const url = `http://localhost:3000/api/events/${id}/payment/user/${userId}`;
  
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data: Event = await response.json();
        setEvent(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handlePay = async () => {
    if (!event) return;

    const total = event.equitative
      ? event.total / event.members.length
      : event.products.reduce(
          (sum, p) => (selectedProducts.includes(p._id) ? sum + p.price * p.units : sum),
          0
        );

    const payload = {
      products: event.equitative ? [] : selectedProducts,
      amount: total.toFixed(2)
    };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const result = await response.json();
      navigate('/dashboard');
      console.log('Payment successful:', result);
      // You might want to update the UI or refetch the event data here
    } catch (error) {
      console.error('Error during payment:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const hasUserPaid = () => {
    if (!event || !userId) return false;
    const currentUser = event.members.find(member => member.user.clerkUserId === userId);
    if (!currentUser) return false;
    
    const userPayment = currentUser.paid;
    const requiredPayment = event.equitative ? event.total / event.members.length : event.total;
    
    return userPayment >= requiredPayment;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event data found</div>;

  const isPaymentDisabled = hasUserPaid();
  const isNoItemSelected = !event.equitative && selectedProducts.length === 0;

  return (
    <div className="relative flex flex-col min-h-screen font-serif">
      <Navbar />

      <main className="flex-grow pt-24 pb-8 px-4">
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md">
          <h1 className="text-3xl font-bold mb-6">{event.name}</h1>
          <p className="text-lg mb-4">Event ID: {id}</p>
          <p className="text-md mb-4">Start: {new Date(event.start_date).toLocaleString()}</p>
          <p className="text-md mb-4">End: {new Date(event.end_date).toLocaleString()}</p>

          {/* Participants Count Section */}
          <div className="mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-500 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 14c3.313 0 6-2.687 6-6S15.313 2 12 2 6 4.687 6 8s2.687 6 6 6zM4 14c0-3.313 3.313-6 8-6s8 2.687 8 6v1c0 1.104-.896 2-2 2H6c-1.104 0-2-.896-2-2v-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-lg font-semibold">
              {event.members.length} Participants
            </span>
          </div>

          {/* Products Table */}
          <table className="w-full table-auto border-collapse border border-gray-300 mb-6">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Product</th>
                <th className="border border-gray-300 px-4 py-2">Units</th>
                <th className="border border-gray-300 px-4 py-2">Price per Unit</th>
                <th className="border border-gray-300 px-4 py-2">Total</th>
                {!event.equitative && (
                  <th className="border border-gray-300 px-4 py-2">Select</th>
                )}
              </tr>
            </thead>
            <tbody>
              {event.products.map((product) => (
                <tr key={product._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.units}</td>
                  <td className="border border-gray-300 px-4 py-2">${product.price.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">${(product.price * product.units).toFixed(2)}</td>
                  {!event.equitative && (
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => handleSelectProduct(product._id)}
                        disabled={product.paid}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Payment Section */}
          <div className="mt-4">
            <p className="font-semibold mb-4">
              Total: ${event.total.toFixed(2)}
              {event.equitative ? ` (Per Participant: ${(event.total / event.members.length).toFixed(2)})` : ''}
            </p>

            <button
              type="button"
              className={`bg-blue-500 text-white py-2 px-4 rounded-md transition-colors ${
                isPaymentDisabled || isNoItemSelected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
              onClick={handlePay}
              disabled={isPaymentDisabled || isNoItemSelected}
            >
              {isPaymentDisabled 
                ? "Already Paid" 
                : (event.equitative 
                    ? "Pay Now" 
                    : isNoItemSelected 
                      ? "Select items to pay" 
                      : "Pay for selected items"
                  )
              }
            </button>
          </div>

          {/* Members List */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Members Payment Status</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Paid by</th>
                  <th className="border border-gray-300 px-4 py-2">Paid</th>
                  <th className="border border-gray-300 px-4 py-2">Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                {event.members.map((member) => (
                  <tr key={member._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {member.user.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.paid > 0 ? "Yes" : "No"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${member.paid.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetailPage;