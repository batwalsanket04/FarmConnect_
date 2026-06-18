import React, { useState } from 'react'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Navbar from './Componants/Navbar'

import UserForms from './Pages/auth/UserForms'
import FarmerForms from './Pages/auth/FarmerForms'
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
import FallbackPage from './Componants/FallBackPage'
import Pegination from './Componants/Pegination'
import { useAppContext } from './context/Context'
import ProtectedRoutes from './Pages/auth/ProtectedRoutes'
import Farmers from './Componants/Farmers'
import FarmerProducts from './Componants/farmerProducts'
import ViewOrderDetail from './Pages/farmer/viewOrderDetail'
 

const App = () => {

  // CATEGORY STATE
  const [selectedCategory, setSelectedCategory] = useState("All")
const [currentPage,setCurrentpage]=useState(0)
const {farmerProduct}=useAppContext();


  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
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
                  farmerProduct={farmerProduct}
                  
                />
                <Pegination 
                currentPage={currentPage}
                setCurrentpage={setCurrentpage}
                farmerProduct={farmerProduct}
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