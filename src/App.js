
import './App.css';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';

import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>hello</h1>

     <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/Register" element={<AuthPage />} />

        
      </Routes>
    </div>
  );
}

export default App;
