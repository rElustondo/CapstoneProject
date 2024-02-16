
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import UserPage from './components/UserPage';
import ProfilePage from './components/ProfilePage';
import Aboutus from './components/Aboutus';
import Serviceoverviewpage from './components/serviceoverviewpage';
import FaqPage from './components/FaqPage';
import ContactUs from './components/ContactUS';
import PaymentForm from './components/PaymentForm';
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
      <Route path='/payment' element={<PaymentForm/>} />
      <Route path='/faq' element={<FaqPage/>} />
      <Route path='/contact_and_support' element={<ContactUs/>} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
