
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import UserPage from './components/UserPage';
import ProfilePage from './components/ProfilePage';
import Aboutus from './components/Aboutus';
import Serviceoverviewpage from './components/serviceoverviewpage';
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<HomePage />}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route  path='/user-login' element={<UserPage/>} />
      <Route  path='/profile' element={<ProfilePage/>} />
      <Route path='/Aboutus' element={<Aboutus/>}/>
      <Route path='/Aboutus/Service' element={<Serviceoverviewpage/>} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
