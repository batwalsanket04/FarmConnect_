import React, { useState } from 'react'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Navbar from './Componants/Navbar'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import UserForms from './Pages/auth/UserForms'
import FarmerForms from './Pages/auth/FarmerForms'
import ForgotPassword from './Pages/auth/ForgotPassword'
import UserDashboard from './Pages/User/UserDashboard'
import FarmerDashboard from './Pages/farmer/FarmerDashboard'
import MyProduct from './Pages/farmer/MyProduct'
import DashboardHome from './Pages/farmer/DashboardHome'
import AddProducts from './Pages/farmer/AddProducts'
import Order from './Pages/farmer/Order'
import Cart from './Pages/User/Cart'
import Products from './Pages/User/Products'
import MainBanner from './Componants/MainBanner'
import UserNav from './Pages/User/UserNav'
import MyOrder from './Pages/User/MyOrder'
import Categories from './Componants/Categories'
import FallbackPage from './Componants/FallbackPage'
import { useAppContext } from './context/Context'
import ProtectedRoutes from './Pages/auth/ProtectedRoutes'
import Farmers from './Componants/Farmers'
import FarmerProducts from './Componants/farmerProducts'
import ViewOrderDetail from './Pages/farmer/viewOrderDetail'
import EditFarmerProduct from './Componants/EditFarmerProduct'
import LandingPage from './LandingPage/LandingPage'
import Features from './LandingPage/Features'
import About from './LandingPage/About'
import Statistics from './LandingPage/Statistics'
import Contact from './LandingPage/Contact'
 

const App = () => {

  // CATEGORY STATE
  const [selectedCategory, setSelectedCategory] = useState("All")
const [currentPage,setCurrentpage]=useState(0)
const {farmerProduct}=useAppContext();



  return (

    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="colored"
        toastStyle={{
          borderRadius: '18px',
          background: '#064e3b',
          color: '#f8fafc',
          boxShadow: '0 14px 35px rgba(6, 78, 59, 0.18)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
        bodyStyle={{
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          fontSize: '0.95rem',
          lineHeight: '1.5',
        }}
        progressStyle={{
          background: '#a7f3d0',
        }}
      />

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/features' element={<LandingPage />} />
        <Route path='/about' element={<LandingPage />} />
        <Route path='/statistics' element={<LandingPage />} />
        <Route path='/contact' element={<LandingPage />} />

        <Route
          path="/buyer"
          element={
            <>
              <Navbar />
              <UserForms />
            </>
          }
        />

        <Route
          path="/farmer"
          element={
            <>
              <Navbar />
              <FarmerForms />
            </>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <>
              <Navbar />
              <ForgotPassword />
            </>
          }
        />

        {/* USER DASHBOARD */}
        <Route path='/user-dashboard' element={<ProtectedRoutes allowedRole="user"><UserDashboard /></ProtectedRoutes>}>
          
          <Route
            index
            element={
              <>
                <MainBanner />

                <Categories
                  setSelectedCategory={setSelectedCategory}
                />

                <Products
                  selectedCategory={selectedCategory}
                  currentPage={currentPage}
                  setCurrentpage={setCurrentpage}
                />
              </>
            }
          />

          <Route path='cart' element={<Cart />} />

          <Route
            path='my-order'
            element={
              <>
                <UserNav />
                <MyOrder />
              </>
            }
          />
         < Route path='farmers' element={<Farmers/>} />
         <Route path='farmer/:id' element={<FarmerProducts/>} />

        </Route>

        {/* FARMER DASHBOARD */}
        <Route path='/farmer-dashboard' element={<ProtectedRoutes allowedRole="farmer"><FarmerDashboard /></ProtectedRoutes>}>
          <Route index element={<DashboardHome />} />
          <Route path='my-product' element={<MyProduct />} />
          <Route path='edit-product/:id' element={<EditFarmerProduct/>} />
          <Route path='add' element={<AddProducts />} />
          <Route path='order' element={<Order />} />
          <Route path='view-order/:id' element={<ViewOrderDetail/>}/>

        </Route>

        {/* FALLBACK ROUTE */}
        <Route path='*' element={<FallbackPage />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App