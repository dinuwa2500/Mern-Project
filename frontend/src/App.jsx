import { useState } from 'react'
import './App.css'
import  Home  from './pages/Home.jsx'
import RegisterPage from './pages/register/RegisterPage.jsx'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/login/login.jsx'
import ProfilePage from './pages/profile/profilePage.jsx'
import Support from './pages/support/Support.jsx'
import AdminDashboard from './pages/Admin/admin.jsx'

function App() {

  return (
   <div className='App font-open-sans'>
    <Routes>
      <Route index path='/' element={   <Home />}></Route>
      <Route path='/register' element={<RegisterPage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/profile' element={<ProfilePage />}></Route>
      <Route path='/support' element={<Support />}></Route>
      <Route path='/admin' element={<AdminDashboard />}></Route>
   </Routes>
   <Toaster />
   </div>
  
  );
}

export default App
