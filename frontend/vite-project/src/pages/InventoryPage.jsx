import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import ItemForm from '../components/ItemForm';

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axiosInstance.get('/'); 
    setItems(response.data);
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/${id}`);
    fetchItems();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Inventory Management</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <ItemForm refreshItems={fetchItems} editingItem={editingItem} />
      </div>

      {items.map((item) => (
        <div 
          key={item._id} 
          style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        >
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          
          <img 
            src={item.image} 
            alt={item.name} 
            style={{ width: '150px', height: '150px', objectFit: 'cover', marginBottom: '10px' }} 
          />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
            <button 
              onClick={() => setEditingItem(item)}
              style={{ backgroundColor: 'orange', color: 'white', padding: '8px 12px', border: 'none', cursor: 'pointer' }}
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(item._id)}
              style={{ backgroundColor: 'red', color: 'white', padding: '8px 12px', border: 'none', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryPage;
