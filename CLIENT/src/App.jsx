import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NavBar from './components/common/NavBar'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Settings from './components/core/Dashboard/Settings'
import MyProfile from './components/core/Dashboard/MyProfile'
import Footer from './components/common/Footer/Footer'
import Listing from './components/core/Home/Listing'
import About from './pages/About'
import Search from './pages/search'
import PropertySelectionPage from './pages/PropertySelectionPage'
import ConfirmBookingPage from './pages/ConfirmBooking'
import AddProperty from './pages/AddProperty'
import SellerProperties from './pages/SellerProperties'
import EditProperty from './pages/UpdateProperty'

function App() {
   
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col '>
      
      <NavBar/>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/search' element={<Search />} />
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/confirmBooking/:listingId' element={<ConfirmBookingPage/>} />
          <Route path='/listing/:listingId' element={<Listing/>} />
          <Route path='/ProperySelection/:listingId' element={<PropertySelectionPage/>} />
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path='/dashboard/Add-Property' element={<AddProperty/>} />
          <Route path='/update-listing/:propertyId' element={<EditProperty/>} />
          <Route path='/dashboard/seller/Properties' element={<SellerProperties/>} />
          <Route path="/dashboard/settings" element={<Settings/>}/>

        </Routes>
      </div>
      <Footer/>
    </div>
  )

}

export default App
