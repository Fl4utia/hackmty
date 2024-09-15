import React, { useState } from "react";
import Modal from "react-modal";
import Header from "./Header"; // Import the new Header component

const events = [
  { id: 1, name: "Annual Gala", date: "December 31, 2024", description: "Join us for an evening of celebration and fun!" },
  { id: 2, name: "Corporate Meetup", date: "January 15, 2025", description: "Networking and knowledge sharing event." },
  { id: 3, name: "Wedding Ceremony", date: "February 20, 2025", description: "A beautiful wedding ceremony." },
];

const products = [
  { id: 1, name: "Catering Service", price: 100 },
  { id: 2, name: "Venue Rental", price: 500 },
  { id: 3, name: "DJ Service", price: 200 },
  { id: 4, name: "Photography", price: 300 },
];

export default function Dashboard() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleProductSelection = (productId: number, price: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
      setTotalAmount(totalAmount - price);
    } else {
      setSelectedProducts([...selectedProducts, productId]);
      setTotalAmount(totalAmount + price);
    }
  };

  const handlePayment = () => {
    // Call the payment API here
    // For now, we'll just simulate a successful payment
    setPaymentSuccess(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="font-serif">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> {/* Use the new Header component */}

      <main className="pt-20">
        <section id="events" className="py-20 bg-white text-center">
          <h1 className="text-6xl tracking-widest mb-6">Events</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            {events.map(event => (
              <div key={event.id} className="bg-gray-200 p-4 rounded-lg shadow-lg cursor-pointer" onClick={() => setSelectedEvent(event)}>
                <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
                <p className="mb-2">{event.date}</p>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Modal
          isOpen={!!selectedEvent}
          onRequestClose={() => setSelectedEvent(null)}
          contentLabel="Event Dashboard"
          className="max-w-2xl mx-auto p-4 text-white bg-gray-800 rounded"
        >
          {selectedEvent && (
            <div>
              <header className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-4">{selectedEvent.name}</h2>
                <p>{selectedEvent.date}</p>
                <p>{selectedEvent.description}</p>
              </header>

              <section className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Products/Services</h3>
                <ul>
                  {products.map(product => (
                    <li key={product.id} className="mb-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          onChange={() => handleProductSelection(product.id, product.price)}
                        />
                        {product.name} - ${product.price}
                      </label>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Total Amount</h3>
                <p>${totalAmount}</p>
              </section>

              <button
                onClick={handlePayment}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Pay
              </button>

              {paymentSuccess && (
                <div className="mt-6 p-4 bg-green-500 text-white rounded">
                  Payment successful! Thank you for your contribution.
                </div>
              )}
            </div>
          )}
        </Modal>
      </main>

      <footer className="bg-[#00303F] text-white text-center py-4">
        <div className="flex justify-center space-x-4 mb-2">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
        <p>Created by FinVents Team in collaboration with Capital One<br />Copyright 2024</p>
      </footer>
    </div>
  );
}