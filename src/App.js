
import './App.css';
<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
=======
import { Routes, Route } from 'react-router-dom';
>>>>>>> dd97d3f16d949ca7f11f1b29e3257cebfdea53d5

function App() {
  return (
    <div className="App">
      <h1>hello</h1>

     <Navbar/>
      <Routes>
<<<<<<< HEAD
      <Route path='/' element={<HomePage/>}/>
=======
        <Route path="/Register"/>
>>>>>>> dd97d3f16d949ca7f11f1b29e3257cebfdea53d5
      </Routes>
    </div>
  );
}

export default App;
