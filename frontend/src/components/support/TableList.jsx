import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MainLayout from '../../components/MainLayout';
import UpdateTicket from './updateTicket';


export default function TableList() {
    {/* make table of sample data */}
    {/*const tableData = [
        { id: addTicket._id , name: "imalka", email:"helloworld1@gmail.com", mobileNumber: "071-6940123", product: "wallet",subject: "About Delivery problem", status: true },
        { id: 2, name: "Ima", email:"helloworld1@gmail.com", mobileNumber: "0719845678", product: "Bag",subject: "About Orderd problem", status: false },
        
    ];*/}


    const handleOpen = (mode, item) => {
      setModalMode(mode);
      setSelectedItem(item);
      setIsOpen(true); // Open the modal
  };


    const userStore = useSelector((state) => state.user);
    const [tableData, setTableData] = useState([]); // State to store fetched data
    const [error, setError] = useState(null); // State to store error (if any)
 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const [selectedItem, setSelectedItem] = useState(null); // State to store selected ticket
    const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility
    const [modalMode, setModalMode] = useState('add'); 
  
    const handleSubmit = () => {
        if (modalMode === 'add') {
            // Handle add item
        } else {
            // Handle edit item
        }
        setIsOpen(false);
    };
  
    const handleClose = () => {
      setIsOpen(false);  // Using the prop passed to the component
  };


 // Sorting functionality
 const handleSort = (key) => {
  let direction = 'asc';
  if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
  }
  setSortConfig({ key, direction });
};

// Search and filter functionality
const filteredData = tableData.filter(item => 
  Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
  )
);

// Pagination
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

const paginate = pageNumber => setCurrentPage(pageNumber);

const handleDelete = async (ticketId) => {
  const token = userStore.userInfo.token; // Get the token from redux store
  if (!token) {
      setError('You are not logged in');
      return;
  }

  try {
      const response = await fetch(`http://localhost:8000/api/tickets/${ticketId}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the request headers
          },
      });

      if (response.ok) {
          // Remove the deleted ticket from the state without refreshing the page
          setTableData((prevData) => prevData.filter(item => item._id !== ticketId));
      } else {
          setError('Failed to delete the ticket');
      }
  } catch (error) {
      setError('Network error, please try again later');
  }
};

    useEffect(() => {
      const fetchData = async () => {
          const token = userStore.userInfo.token; // Get the token from localStorage
          if (!token) {
              setError('You are not logged in');
              return;
          }
  
          try {
              const response = await fetch('http://localhost:8000/api/tickets', {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`, // Include the token in the request headers
                  },
              });

              console.log(response);
              const data = await response.json();
  
              if (response.ok) {
                  setTableData(data); // Set the fetched data to state
              } else {
                  setError('Failed to load tickets');
              }
          } catch (error) {
              setError('Network error, please try again later');
          }
      };
  
      fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount
  return (
    <MainLayout>
        <div className="p-6 space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <input
                    type="text"
                    placeholder="Search tickets..."
                    className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        Filter
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                        Export
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {['ID', 'Name', 'Email', 'Mobile', 'Product', 'Subject', 'Inquiry', 'Image', 'Actions'].map((header) => (
                                <th
                                    key={header}
                                    className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort(header.toLowerCase())}
                                >
                                    {header}
                                    {sortConfig.key === header.toLowerCase() && (
                                        <span className="ml-2">
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {currentItems.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">{item._id.slice(-6)}</td>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4 text-blue-600 hover:underline">
                                    <a href={`mailto:${item.email}`}>{item.email}</a>
                                </td>
                                <td className="px-6 py-4">{item.mobileNumber}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        {item.product}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium">{item.subject}</td>
                                <td className="px-6 py-4 max-w-xs truncate">{item.inquiry}</td>
                                <td className="px-6 py-4">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt="Ticket"
                                            className="w-16 h-16 object-cover rounded-lg shadow-sm cursor-pointer hover:shadow-md transition"
                                        />
                                    )}
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <button
                                        onClick={() => handleOpen('edit', item)} // Open the modal for editing
                                        className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition"
                                    >
                                        Update
                                    </button>
                                    <button
                                         onClick={() => handleDelete(item._id)} // Open the modal for deleting
                                        className="px-3 py-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
                                    >
                                        Delete
                                    </button>
                                    <button
                                         onClick={() => handleDelete(item._id)} // Open the modal for deleting
                                        className="px-3 py-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
                                    >
                                        Message
                                    </button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Loading & Error States */}
                {!tableData.length && !error && (
                    <div className="p-8 text-center text-gray-500">
                        <p className="mt-2">Loading tickets...</p>
                    </div>
                )}

                {error && (
                    <div className="p-8 text-center text-red-500">
                        ⚠️ Error loading data: {error}
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center space-x-2">
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`px-3 py-1 rounded-md ${
                            currentPage === i + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>

        {/* UpdateTicket Modal */}
        {isOpen && (
            <UpdateTicket
            isOpen={isOpen}
            onClose={handleClose}  // Correctly passing handleClose as a prop
            item={selectedItem}    // Pass the selected item for editing
        />
        )}
    </MainLayout>
);
} 