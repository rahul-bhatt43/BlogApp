import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Blogs from './pages/Blogs/Blogs'
import Error from './pages/Error/Error'
import Create from './pages/Create/Create'
import Login from './pages/UserAuth/Login'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
import Protectlogin from './ProtectedRoutes/Protectlogin'
import BlogPage from './components/BlogArticle/BlogPage'

function App() {

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/blogs' element={<Blogs />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path='/create' element={<Create />}></Route>
        </Route>
        <Route element={<Protectlogin />}>
          <Route path='/login' element={<Login />}></Route>
        </Route>
        <Route path='/blogpage/:blogid' element={<BlogPage />}></Route>
        <Route path='/*' element={<Error />}></Route>
      </Routes>
    </div>
  )
}

export default App
