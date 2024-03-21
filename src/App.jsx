import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './layoutComponents/Navbar';
import Header from './layoutComponents/Header';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar>
      <h1>Travel Temptation</h1>
      <Routes>
            <Route index element= {<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/excursions" element={<Home />} />
            <Route path="/explore" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Home />} />
        </Routes>
        </Navbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
