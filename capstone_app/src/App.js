
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import UserPage from './components/UserPage';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<HomePage />}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route  path='/user-login' element={<UserPage/>} />
      <Route  path='/profile' element={<ProfilePage/>} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
