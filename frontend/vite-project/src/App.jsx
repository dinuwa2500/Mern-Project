import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import InsertItemPage from './pages/InsertItemPage';
import InventoryPage from './pages/InventoryPage';
import BuyPage from './pages/BuyPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/insert' element={<InsertItemPage />} />
        <Route path='/inventory' element={<InventoryPage />} />
        <Route path='/buy' element={<BuyPage />} />
      </Routes>
    </Router>
  );
}

export default App;