import { useState } from "react";
import { useEffect } from "react";
import MainLayout from "../../components/MainLayout";

export default function UpdateTicket({ isOpen, onClose, item }) {
    
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Update Support Ticket</h2>
        
        {/* Your form fields here using item prop */}
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
</MainLayout>
    );
}

