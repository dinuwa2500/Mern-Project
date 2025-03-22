import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import FilterBar from '../components/FilterBar';
import ItemCard from '../components/ItemCard';

const BuyPage = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async (filters = {}) => {
    const response = await axiosInstance.get('/', { params: filters });
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handlePurchase = async (item) => {
    try {
      if (item.quantity > 0) {
        
        await axiosInstance.put(`/${item._id}`, { 
          quantity: item.quantity - 1 
        });

        alert(`You purchased: ${item.name}`);
        fetchItems(); // Refresh items list
      } else {
        alert("Sorry, this item is out of stock.");
      }
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Try again.");
    }
  };

  return (
    <div>
      <h2>Buy Items</h2>
      <FilterBar onFilter={fetchItems} />
      
      {items.map((item) => (
        <div key={item._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px", textAlign: "center" }}>
          <img 
            src={item.image} 
            alt={item.name} 
            style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
          />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <p>Stock: {item.quantity}</p>
          
          
          <button 
            onClick={() => handlePurchase(item)} 
            disabled={item.quantity <= 0}
            style={{
              backgroundColor: item.quantity > 0 ? "green" : "gray",
              color: "white",
              padding: "8px 12px",
              border: "none",
              cursor: item.quantity > 0 ? "pointer" : "not-allowed"
            }}
          >
            {item.quantity > 0 ? "Purchase" : "Out of Stock"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BuyPage;
