import { useState, useEffect } from 'react';


export default function TableList() {
    {/* make table of sample data */}
    {/*const tableData = [
        { id: addTicket._id , name: "imalka", email:"helloworld1@gmail.com", mobileNumber: "071-6940123", product: "wallet",subject: "About Delivery problem", status: true },
        { id: 2, name: "Ima", email:"helloworld1@gmail.com", mobileNumber: "0719845678", product: "Bag",subject: "About Orderd problem", status: false },
        
    ];*/}

    const [tableData, setTableData] = useState([]); // State to store fetched data
    const [error, setError] = useState(null); // State to store error (if any)
    const [selectedItem, setSelectedItem] = useState(null);

    const onOpen = (item) => {
      setSelectedItem(item);
    };
    
    const handleClose = () => {
      setSelectedItem(null);
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/tickets'); // Replace with your actual API URL
                const data = await response.json();

                if (response.ok) {
                    setTableData(data); // Set the fetched data to state
                } else {
                    setError('Failed to load data');
                }
            } catch (error) {
                setError('Network error, please try again later');
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount
    return (
        <>
        <div className="overflow-x-auto mt-10 bg-white p-5 rounded-lg shadow-md">
          <table className="table w-full text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Inquiry</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3">{item.mobileNumber}</td>
                  <td className="px-4 py-3">{item.product}</td>
                  <td className="px-4 py-3">{item.subject}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{item.inquiry}</td>
                  <td className="px-4 py-3">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt="Ticket" 
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button 
                      onClick={() => onOpen(item)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Update
                    </button>
                    <button 
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
        {/* Support Modal */}
        {selectedItem && (
          <Support 
            isOpen={true} 
            onClose={() => setSelectedItem(null)}
            item={selectedItem}
          />
        )}
      </>
    )
}