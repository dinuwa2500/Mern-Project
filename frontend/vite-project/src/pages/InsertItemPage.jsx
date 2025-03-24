import { useState } from 'react';
import axiosInstance from '../utils/axios';

const InsertItemPage = () => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', quantity: '', image: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/', formData);
      alert('Item added successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name='name' onChange={handleChange} placeholder='Name' />
        <input name='description' onChange={handleChange} placeholder='Description' />
        <input name='price' type='number' onChange={handleChange} placeholder='Price' />
        <input name='quantity' type='number' onChange={handleChange} placeholder='Quantity' />
        <input name='image' onChange={handleChange} placeholder='Image URL' />
        <button type='submit' style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}>Add Item</button>
      </form>
    </div>
  );
};

export default InsertItemPage;
