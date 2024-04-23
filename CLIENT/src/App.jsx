import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NavBar from './components/common/NavBar'
import Dashboard from './pages/DashBoard'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Settings from './components/core/Dashboard/Settings'
import MyProfile from './components/core/Dashboard/MyProfile'
import Footer from './components/common/Footer/Footer'

function App() {
   
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col '>
      
      <NavBar/>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
            <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
            <Route path="/dashboard/settings" element={<Settings/>}/>
          </Route>  
        </Routes>
      </div>
      <Footer/>
    </div>
  )

}

export default App
