import { useState } from 'react';

const FilterBar = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    onFilter({ search, minPrice, maxPrice });
  };

  return (
    <div style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" style={{ padding: '8px', marginRight: '10px' }} />
      <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min Price" style={{ padding: '8px', marginRight: '10px' }} />
      <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max Price" style={{ padding: '8px', marginRight: '10px' }} />
      <button onClick={handleFilter} style={{ backgroundColor: 'blue', color: 'white', padding: '8px 12px', border: 'none', cursor: 'pointer' }}>Apply Filters</button>
    </div>
  );
};

export default FilterBar;
