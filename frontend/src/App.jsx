import { useState } from 'react'
import './App.css'
import  Home  from './pages/Home.jsx'
import RegisterPage from './pages/register/RegisterPage.jsx'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/login/login.jsx'
import ProfilePage from './pages/profile/profilePage.jsx'
import Support from './pages/support/Support.jsx'
import DashboardLayout from './pages/admintest/Dashboard.jsx'
import Orders from './pages/admintest/orders.jsx'
import Users from './pages/admintest/userView.jsx'
import ModalForm from './components/support/modelForm.jsx'
import TableList from './components/support/TableList.jsx'
import DashboardWelcome from './pages/admintest/dashboardwelcome.jsx'
import Sidebar from './components/support/sidebar.jsx'
import UpdateTicket from './components/support/updateTicket.jsx'
import InsertItemPage from './pages/asitha/InsertItemPage.jsx'
import InventoryPage from './pages/asitha/InventoryPage.jsx'
import BuyPage from './pages/asitha/BuyPage.jsx'
import AdminRoute from './pages/admin/adminroute.jsx'
  
function App() {

  return (
   <div className='App font-open-sans'>
    <Routes>
      <Route index path='/' element={   <Home />}></Route>
      <Route path='register' element={<RegisterPage />}></Route>
      <Route path='login' element={<LoginPage />}></Route>
      <Route path='profile' element={<ProfilePage />}></Route>
      <Route path='support' element={<ModalForm />}></Route>
         
      
      
  
       <Route path="/admin" element={<AdminRoute element={<DashboardLayout />} />}>
          <Route index element={<DashboardWelcome />} />
          <Route path="dashboard" element={<DashboardWelcome />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
  
        <Route path='/mytickets' element={<TableList />}>
        
        </Route>


      
      
   </Routes>
   <Toaster />
   </div>
  
  );
}

export default App
