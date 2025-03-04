import React,{useState,useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export const backendUrl =  import.meta.env.VITE_BACKEND_URL

const App = () => {

  const [token,setToken] = useState(localStorage.getItem('token') ?localStorage.getItem('token'): '')

  useEffect(()=>{
    localStorage.setItem('token',token)

  },[token])
  
  return (
    <div className='px-4 sm:px-[5vh] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer  />
      <Navbar setToken={setToken} />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home token={token} />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login setToken={setToken} />}  />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

