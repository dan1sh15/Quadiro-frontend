import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom"
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <div className='min-h-screen bg-[#e1e1e1] relative ubuntu'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
