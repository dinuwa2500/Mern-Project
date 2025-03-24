import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Homemade Items Marketplace</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <Link to='/insert' style={{ padding: '10px', backgroundColor: 'blue', color: 'white', textDecoration: 'none' }}>Insert Item</Link>
        <Link to='/inventory' style={{ padding: '10px', backgroundColor: 'green', color: 'white', textDecoration: 'none' }}>Inventory</Link>
        <Link to='/buy' style={{ padding: '10px', backgroundColor: 'red', color: 'white', textDecoration: 'none' }}>Buy Items</Link>
      </div>
    </div>
  );
};

export default HomePage;
