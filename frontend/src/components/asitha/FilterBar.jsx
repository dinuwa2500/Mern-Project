import { useState } from 'react';

const FilterBar = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    onFilter({ search, minPrice, maxPrice });
  };

  return (
    <div className="mb-4">
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
      <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min Price" />
      <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max Price" />
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default FilterBar;
