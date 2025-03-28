import { useState } from "react";
import MainLayout from "../../components/MainLayout";
import { useSelector } from "react-redux";

export default function ModalForm({ isOpen, onClose, item }) {
    const userStore = useSelector((state) => state.user);
    const token = userStore?.userInfo?.token || "";

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        product: "",
        subject: "",
        inquiry: "",
    });

    const [status] = useState("Inactive"); // Default status
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    // ✅ Validation Function
    const validate = () => {
        let newErrors = {};
        const { name, email, mobileNumber, product, subject, inquiry } = formData;

       // Name validation (only letters & spaces, 2 to 50 characters)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name.trim()) {
        newErrors.name = "Name is required.";
    } else if (!nameRegex.test(name)) {
        newErrors.name = "Name can only contain letters and spaces.";
    } else if (name.length < 2 || name.length > 50) {
        newErrors.name = "Name must be between 2 and 50 characters.";
    }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!emailRegex.test(email)) newErrors.email = "Invalid email format.";

        // Mobile number validation (10 digits only)
        const mobileRegex = /^\d{10}$/;
        if (!mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required.";
        else if (!mobileRegex.test(mobileNumber))
            newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";

        // Product validation
        if (!product.trim()) newErrors.product = "Product name is required.";

        // Subject validation (5 to 100 characters)
        if (!subject.trim()) newErrors.subject = "Subject is required.";
        else if (subject.length < 5 || subject.length > 100)
            newErrors.subject = "Subject must be between 5 and 100 characters.";

        // Inquiry validation (10 to 500 characters)
        if (!inquiry.trim()) newErrors.inquiry = "Inquiry is required.";
        else if (inquiry.length < 10 || inquiry.length > 500)
            newErrors.inquiry = "Inquiry must be between 10 and 500 characters.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // ✅ Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
    };

    // ✅ Submit Handler
    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!validate()) {
            return; // Stop form submission if validation fails
        }

        const API_URL = "http://localhost:8000/api";

        try {
            // Trim input values
            const trimmedData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                mobileNumber: formData.mobileNumber.trim(),
                product: formData.product.trim(),
                subject: formData.subject.trim(),
                inquiry: formData.inquiry.trim(),
                status,
            };

            // Send the form data to the backend
            const response = await fetch(`${API_URL}/addticket`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(trimmedData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Ticket submitted successfully!");
                setErrorMessage("");
                setFormData({
                    name: "",
                    email: "",
                    mobileNumber: "",
                    product: "",
                    subject: "",
                    inquiry: "",
                });
                setErrors({}); // Clear errors after success
            } else {
                setErrorMessage("Error submitting ticket. Please try again.");
            }
        } catch (error) {
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

                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
                    )}

                    <form className="space-y-4" onSubmit={submitHandler}>
                        {/* Input Fields */}
                        {[
                            { label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
                            { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
                            { label: "Mobile Number", name: "mobileNumber", type: "tel", placeholder: "Enter your phone number" },
                            { label: "Product", name: "product", type: "text", placeholder: "Product name" },
                            { label: "Subject", name: "subject", type: "text", placeholder: "Subject of inquiry" },
                        ].map(({ label, name, type, placeholder }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder={placeholder}
                                />
                                {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                            </div>
                        ))}

                        {/* Inquiry Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Inquiry
                            </label>
                            <textarea
                                name="inquiry"
                                value={formData.inquiry}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 h-32"
                                placeholder="Type your message here"
                            />
                            {errors.inquiry && <p className="text-red-500 text-xs mt-1">{errors.inquiry}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
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
