import React from 'react';
import MainLayout from '../../components/MainLayout';
import { useState } from 'react';

const issuesMap = {
    'Order Issue': ['Late delivery', 'Wrong item', 'Missing item'],
    'Payment Issue': ['Failed payment', 'Overcharge', 'Refund request'],
    'Technical Issue': ['App not loading', 'Login issue', 'Notification problem'],
    'Account Issue': ['Change email', 'Password reset', 'Delete account'],
    'Other': ['General inquiry', 'Feedback']
  };


  const  Support  = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: 'Order Issue', // Default subject
      issue: issuesMap['Order Issue'][0], // Default issue
      message: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        // Reset issue when subject changes
        ...(name === 'subject' && { issue: issuesMap[value][0] })
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData); // Replace with your API call
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: 'Order Issue',
        issue: issuesMap['Order Issue'][0],
        message: '',
      });
    };
  
    return (
        <MainLayout>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Contact Support
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your name"
              />
            </div>
  
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>
  
            {/* Subject (Dropdown) */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {Object.keys(issuesMap).map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Issue (Dropdown) */}
            <div>
              <label htmlFor="issue" className="block text-sm font-medium text-gray-700">
                Issue
              </label>
              <select
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {issuesMap[formData.subject].map((issue) => (
                  <option key={issue} value={issue}>
                    {issue}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your message here..."
              />
            </div>
  
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      </MainLayout>
    );
  };
  

export default Support;
