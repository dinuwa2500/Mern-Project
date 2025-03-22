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

function App() {

  return (
   <div className='App font-open-sans'>
    <Routes>
      <Route index path='/' element={   <Home />}></Route>
      <Route path='register' element={<RegisterPage />}></Route>
      <Route path='login' element={<LoginPage />}></Route>
      <Route path='profile' element={<ProfilePage />}></Route>
      <Route path='support' element={<ModalForm />}></Route>
         
      
      
      <Route path='/admin' element={<DashboardLayout />}>
        <Route path='dashboard' element={<DashboardWelcome />}></Route>
        <Route path='orders' element={<Orders />}></Route>
        <Route path='users' element={<Users />}></Route>
        <Route path='support' element={<TableList />}></Route>
      </Route>
  

    
      
      
   </Routes>
   <Toaster />
   </div>
  
  );
}

export default App
