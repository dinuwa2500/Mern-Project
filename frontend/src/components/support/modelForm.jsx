import { useState } from "react";
import { useEffect } from "react";
import MainLayout from "../../components/MainLayout";

export default function ModalForm({ isOpen, onClose, item }) {
    
    const [name, setName] = useState(''); // State for Name
    const [email, setEmail] = useState(''); // State for Email
    const [mobileNumber, setMobileNumber] = useState(''); // State for mobileNumber
    const [product, setProduct] = useState(''); // State for product
    const [subject, setSubject] = useState(''); // State for subject
    const [inquiry, setInquiry] = useState(''); // State for inquiry
    const [status, setStatus] = useState('Inactive'); // State for status
    const [errorMessage, setErrorMessage] = useState(''); // Error message state

    // Submit Handler with Validation
    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if all required fields are filled out
        if (!name || !email || !mobileNumber || !product || !subject || !inquiry) {
            setErrorMessage("Please fill out all required fields.");
            return; // Stop the form from submitting if validation fails
        }

        const API_URL = "http://localhost:8000/api";

        try {
            // Send the form data to the backend
            const response = await fetch(`${API_URL}/addticket`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, mobileNumber, product, subject, inquiry, status }) // Include status as well
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Ticket added successfully:", result);
                alert("Ticket submitted successfully!");
                setErrorMessage(""); // Clear any previous errors
            } else {
                console.error("Error submitting ticket:", result);
                setErrorMessage("Error submitting ticket. Please try again.");
            }
        } catch (error) {
            console.error("Network error:", error);
            setErrorMessage("Network error, please try again later.");
        }
    };

    return (
        <MainLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-8">
    <div className="w-full max-w-lg bg-white shadow-md p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Contact Support
        </h3>

        <form className="space-y-4">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    placeholder="Enter your name"
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    placeholder="Enter your email"
                />
            </div>

            {/* Mobile Number */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                    type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    placeholder="Enter your phone number"
                />
            </div>

            {/* Product */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <input
                    type="text" value={product} onChange={(e) => setProduct(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    placeholder="Product name"
                />
            </div>

            {/* Subject */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                    type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    placeholder="Subject of inquiry"
                />
            </div>

            {/* Inquiry */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inquiry</label>
                <textarea
                    value={inquiry} onChange={(e) => setInquiry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 h-32"
                    placeholder="Type your message here"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit" onClick={submitHandler}
                className="w-full py-2 px-4 border hover:cursor-pointer border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Add Ticket
            </button>
        </form>
    </div>
</div>
</MainLayout>
    );
}
