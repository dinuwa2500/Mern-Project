import { useState } from "react";
import { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { useSelector } from "react-redux";

export default function UpdateTicket({ isOpen, onClose, mode, item }) {
    

    const userStore = useSelector((state) => state.user);
    const [name, setName] = useState(''); // State for Name
    const [email, setEmail] = useState(''); // State for Email
    const [mobileNumber, setMobileNumber] = useState(''); // State for mobileNumber
    const [product, setProduct] = useState(''); // State for product
    const [subject, setSubject] = useState(''); // State for subject
    const [inquiry, setInquiry] = useState(''); // State for inquiry
    const [status, setStatus] = useState('Inactive'); // State for status
    const [errorMessage, setErrorMessage] = useState(''); // Error message state


    if (!isOpen) return null; 


    useEffect(() => {
      if (item) {
          setName(item.name);
          setEmail(item.email);
          setMobileNumber(item.mobileNumber);
          setProduct(item.product);
          setSubject(item.subject);
          setInquiry(item.inquiry);
  
      }
  }, [item]);  // Runs when the `item` prop changes


    // Submit Handler with Validation
    const submitHandler = async () => {
      // Assuming the API to update ticket is /api/tickets/:userId/:ticketId
      const token = userStore.userInfo.token;
      const userId = userStore.userInfo._id;

      if (!token) {
          alert('You are not logged in');
          return;
      }

      const formData = {
        name,
        email,
        mobileNumber,
        product,
        subject,
        inquiry,
    
    };

    console.log('Form Data:', formData);  // Log the form data
    try {
      const response = await fetch(`http://localhost:8000/api/tickets/${userId}/${item._id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
          alert('Ticket updated successfully');
          onClose(); // Close the modal
      } else {
          alert(`Failed to update ticket: ${data.message || 'Unknown error'}`);
      }
  } catch (error) {
      console.error('Error updating ticket:', error);
      alert('Network error, please try again later');
  }
  };


    return (
    
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 ">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <h2 className="text-xl font-semibold mb-4">Edit Ticket</h2>

                {/* Modal content */}
                <div className="space-y-4">
                <form className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    placeholder="Enter your name"
                />
                    </div>

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
      
                    </form>
                </div>

                {/* Optional Save & Cancel Buttons */}
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            submitHandler();  // Call the submit handler
                            onClose();       // Close the modal after submitting
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

