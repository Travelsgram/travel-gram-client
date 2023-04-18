
import './App.css';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import TravelGuidePage from './pages/TravelGuidePage';
import UserProfilePage from "./pages/UserProfilePage";
import TravelGuideDetails from './pages/TravelGuideDetails';
import UserList from "./pages/UsersList";
import Footer from './components/Footer';



function App() {
  return (
    <div className="App">
      
     <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/travelguide' element={<TravelGuidePage/>}/>
        <Route path="/register" element={<AuthPage />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route path="/travelguide/:travelguideId" element={<TravelGuideDetails />} />
        <Route path='/users' element={<UserList/>}/>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
