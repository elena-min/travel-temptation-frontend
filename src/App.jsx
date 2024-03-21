import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './layoutComponents/Navbar';
import cover from './images/cover3.jpg';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar>
        <div className='image-container'>
        <img src={cover} alt="Image 1" />
        <div className="overlay">
            <Link to="/trending" className="button">Trending</Link>
            <Link to="/excursions" className="button">Explore</Link>
            <Link to="/trips/europe" className="button">Europe</Link>
         </div>
        </div>
      <div className="content-container">
      <Routes>
            <Route index element= {<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/excursions" element={<Home />} />
            <Route path="/explore" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Home />} />
            <Route path="/trending" element={<Home />} />
            <Route path="/trips/europe" element={<Home />} />
        </Routes>
        </div>
        </Navbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
