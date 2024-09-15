import React, { useState } from 'react';
import Footer from './components/footer';
import Navbar from './components/navbar';

interface Requirement {
    product: string;
    units: number;
    price: number;  // Added price field
}

const CreateEvent: React.FC = () => {
    const [eventName, setEventName] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [isEquitativo, setIsEquitativo] = useState<boolean | null>(null);
    const [requirements, setRequirements] = useState<Requirement[]>([]);

    const handleAddProduct = () => {
        setRequirements([...requirements, { product: '', units: 1, price: 0 }]);
    };

    const handleRequirementChange = (index: number, field: keyof Requirement, value: any) => {
        const updatedRequirements = [...requirements];
        // Ensure that 'value' is cast to the correct type
        if (field === 'units' || field === 'price') {
            updatedRequirements[index][field] = Number(value);
        } else {
            updatedRequirements[index][field] = value;
        }
        setRequirements(updatedRequirements);
    };

    const handleIsEquitativoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsEquitativo(e.target.value === 'yes');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log({
            name: eventName,
            start_date: startDate,
            end_date: endDate,
            requirements,
            equitative: isEquitativo
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
                            <label className="block text-gray-700 font-semibold mb-2">Nombre del Evento</label>
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
                            <label className="block text-gray-700 font-semibold mb-2">Fecha Inicio</label>
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
                            <label className="block text-gray-700 font-semibold mb-2">Fecha Fin</label>
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
                            <label className="block text-gray-700 font-semibold mb-2">¿Es Equitativo?</label>
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
                                If "Yes", the total cost will be divided equally among participants.
                                If "No", each participant will select products to sponsor or buy.
                            </p>
                        </div>

                        {/* Add Products */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Productos (Opcional)</label>
                            {requirements.map((requirement, index) => (
                                <div key={index} className="mb-2">
                                    <input
                                        type="text"
                                        placeholder="Enter product name"
                                        value={requirement.product}
                                        onChange={(e) => handleRequirementChange(index, 'product', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2 mb-2"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Units"
                                        value={requirement.units}
                                        onChange={(e) => handleRequirementChange(index, 'units', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2 mb-2"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={requirement.price}
                                        onChange={(e) => handleRequirementChange(index, 'price', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2 mb-2"
                                    />
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
