
import './App.css';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import TravelGuidePage from './pages/TravelGuidePage';
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <div className="App">
      <h1>hello</h1>

     <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/travelguide' element={<TravelGuidePage/>}/>
        <Route path="/Register" element={<AuthPage />} />
        <Route path="/userprofile" element={<UserProfilePage />} />

      </Routes>
    </div>
  );
}

export default App;
