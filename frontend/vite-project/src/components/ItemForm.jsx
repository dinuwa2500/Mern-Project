import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';

const ItemForm = ({ refreshItems, editingItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: '',
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await axiosInstance.put(`/${editingItem._id}`, formData);
    } else {
      await axiosInstance.post('/', formData);
    }
    setFormData({ name: '', description: '', price: '', quantity: '', image: '' });
    refreshItems();
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: 'auto' }}
    >
      <input name='name' value={formData.name} onChange={handleChange} placeholder='Name' required />
      <input name='description' value={formData.description} onChange={handleChange} placeholder='Description' required />
      <input name='price' type='number' value={formData.price} onChange={handleChange} placeholder='Price' required />
      <input name='quantity' type='number' value={formData.quantity} onChange={handleChange} placeholder='Quantity' required />
      <input name='image' value={formData.image} onChange={handleChange} placeholder='Image URL' required />
      <button 
        type='submit' 
        style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {editingItem ? 'Update Item' : 'Add Item'}
      </button>
    </form>
  );
};

export default ItemForm;
