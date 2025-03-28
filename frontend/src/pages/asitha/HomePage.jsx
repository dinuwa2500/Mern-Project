
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Homemade Items Marketplace</h1>
      <Link to='/insert'>Insert Item</Link>
      <Link to='/inventory'>Inventory</Link>
      <Link to='/buy'>Buy Items</Link>
    </div>
  );
};

export default HomePage;