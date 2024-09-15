import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

interface Requirement {
  name: string;
  units: number;
  price: number;
  paid: boolean;
}

interface Event {
  name: string;
  products: Requirement[];
  equitative: boolean;
  admin: string;
  participants?: string[]; // Add participants to the event
}

const mockEvent: Event = {
  name: "Sample Event",
  products: [
    { name: "Product 1", units: 2, price: 10, paid: false },
    { name: "Product 2", units: 1, price: 20, paid: false },
  ],
  equitative: true, // Change this to true to test the other functionality
  admin: "adminUserId",
  participants: ["Participant 1", "Participant 2"], // Add some participants for demonstration
};

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // Set to true for testing

  useEffect(() => {
    // Simulate fetching event details
    setTimeout(() => {
      setEvent(mockEvent);
      // Simulate user ID check
      setIsAdmin(mockEvent.admin === "adminUserId");
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSelectProduct = (index: number) => {
    setSelectedProducts((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handlePay = () => {
    const total = event?.products.reduce(
      (sum, p, i) => (selectedProducts.includes(i) ? sum + p.price * p.units : sum),
      0
    ) ?? 0;

    const totalPerParticipant = event?.equitative ? total / (event.participants?.length ?? 1) : total;

    // Handle payment logic here
    console.log("Pay total:", totalPerParticipant);
  };

  const handleAddItem = () => {
    // Logic to add new item
    console.log("Add new item logic");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative flex flex-col min-h-screen font-serif">
      <Navbar />

      <main className="flex-grow pt-12 pb-8 px-4">
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md">
          <h1 className="text-3xl font-bold mb-6">{event?.name}</h1>

          {/* Participants Count Section */}
          {event?.participants && (
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
                {event.participants.length} Participants
              </span>
            </div>
          )}

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
              {event?.products.map((product, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.units}</td>
                  <td className="border border-gray-300 px-4 py-2">${(product.price).toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">${(product.price * product.units).toFixed(2)}</td>
                  {!event.equitative && (
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(index)}
                        onChange={() => handleSelectProduct(index)}
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
              Total: ${(
                event?.products.reduce(
                  (sum, p, i) =>
                    !event.equitative && selectedProducts.includes(i)
                      ? sum + p.price * p.units
                      : event.equitative
                      ? sum + p.price * p.units
                      : sum,
                  0
                ).toFixed(2)
              )}
              {event?.equitative ? ` (Per Participant: ${(event?.products.reduce(
                (sum, p) => sum + p.price * p.units,
                0
              ) / (event.participants?.length ?? 1)).toFixed(2)})` : ''}
            </p>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              onClick={handlePay}
              disabled={event?.equitative ? false : selectedProducts.length === 0}
            >
              {event?.equitative ? "Pay Now" : "Pay for selected items"}
            </button>
            {isAdmin && !event?.equitative && (
              <button
                type="button"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors mt-4"
                onClick={handleAddItem}
              >
                Add Item
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
