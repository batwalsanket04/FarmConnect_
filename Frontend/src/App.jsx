import React from 'react'

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

const App = () => {
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
              <FarmerForms/>
            </>
          }
        />

        <Route path='/user-dashboard' element={<UserDashboard/>}>
        <Route path='cart' element={<Cart/>}/>

        </Route>
       <Route path='/farmer-dashboard' element={<FarmerDashboard/>}>
  <Route index element={<DashboardHome/>}/>
  <Route path='my-product' element={<MyProduct/>}/>
  <Route path='add' element={<AddProducts/>}/>
  <Route path='order' element={<Order/>}/>

</Route>


      </Routes>

    </BrowserRouter>

  )
}

export default App