import React, { useState } from "react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { createEvent } from "./api/back.js";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface Requirement {
  name: string;
  units: number;
  price: number; // Added price field
}

const CreateEvent: React.FC = () => {
  const Navigate = useNavigate();
  const [eventName, setEventName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isEquitativo, setIsEquitativo] = useState<boolean | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const { user } = useUser();

  const handleAddProduct = () => {
    setRequirements([...requirements, { name: "", units: 1, price: 0 }]);
  };

  const handleRequirementChange = (
    index: number,
    field: keyof Requirement,
    value: string
  ) => {
    const updatedRequirements = [...requirements];
    if (field === "units" || field === "price") {
      updatedRequirements[index][field] = Number(value);
    } else {
      updatedRequirements[index][field] = value;
    }
    setRequirements(updatedRequirements);
  };

  const handleRemoveProduct = (index: number) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
  };

  const handleIsEquitativoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEquitativo(e.target.value === "yes");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name: eventName,
      start_date: startDate,
      end_date: endDate,
      products: requirements,
      equitative: isEquitativo,
      admin: user?.id,
    });

    createEvent({
      name: eventName,
      start_date: startDate,
      end_date: endDate,
      products: requirements,
      admin: user?.id,
      equitative: isEquitativo,
    }).then((data) => {
      console.log(data);

      if (data.error) {
        alert(data.error);
      } else {
        alert("Event created successfully!");
        setEventName("");
        setStartDate("");
        setEndDate("");
        setIsEquitativo(null);
        setRequirements([]);

        // Redirect to event page
        Navigate(`/dashboard`);
      }
    });
  };

  return (
    <div className="relative flex flex-col min-h-screen font-serif">
      <Navbar />

      <main className="flex-grow pt-12 pb-8 px-4">
        <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Create Event</h1>

          <form onSubmit={handleSubmit}>
            {/* Event Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Nombre del Evento
              </label>
              <input
                type="text"
                placeholder="Enter event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            {/* Start Date */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Fecha Inicio
              </label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Fecha Fin
              </label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            {/* Is Equitativo */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                ¿Es Equitativo?
              </label>
              <div className="flex items-center mb-2">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="isEquitativo"
                    value="yes"
                    className="mr-1"
                    onChange={handleIsEquitativoChange}
                    required
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="isEquitativo"
                    value="no"
                    className="mr-1"
                    onChange={handleIsEquitativoChange}
                    required
                  />
                  No
                </label>
              </div>
              <p className="text-gray-600 text-sm">
                If "Yes", the total cost will be divided equally among
                participants. If "No", each participant will select products to
                sponsor or buy.
              </p>
            </div>

            {/* Add Products */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Productos (Opcional)
              </label>
              {requirements.map((requirement, index) => (
                <div key={index} className="mb-4 border-b pb-2">
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={requirement.name}
                    required
                    onChange={(e) =>
                      handleRequirementChange(index, "name", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <div className="mb-2">
                    <label className="block text-gray-700 font-semibold">
                      Units
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="Units"
                      value={requirement.units}
                      onChange={(e) =>
                        handleRequirementChange(index, "units", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-2 mb-2"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 font-semibold">
                      Price $
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="Price"
                      value={requirement.price}
                      onChange={(e) =>
                        handleRequirementChange(index, "price", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-2 mb-2"
                    />
                  </div>
                  {(!requirement.name ||
                    requirement.units <= 0 ||
                    requirement.price <= 0) && (
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(index)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition-colors"
              >
                Add Product
              </button>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateEvent;
