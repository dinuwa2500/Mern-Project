import { useEffect, useState } from 'react';
  import axiosInstance from '../../utils/axios';
import ItemForm from '../../components/asitha/ItemForm';

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axiosInstance.get('/'); // Ensure this fetches items properly
    setItems(response.data);
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/${id}`);
    fetchItems();
  };

  return (
    <div>
      <h2>Inventory Management</h2>
      <ItemForm refreshItems={fetchItems} editingItem={editingItem} />
      
      {items.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          
          
          
          <img 
             src={item.image} 
              alt={item.name} 
              className="fixed-image-size" 
          />




          <button onClick={() => setEditingItem(item)}>Edit</button>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default InventoryPage;
