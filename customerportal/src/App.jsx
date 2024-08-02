import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import SignOut from './pages/SignOut.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Profile from './pages/Profile.jsx'
import ShopPage from './pages/ShopPage';
import ProductDetail from './components/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccess from './pages/CheckoutSuccessPage';
import CartPage from './pages/CartPage.jsx';

function App() {

  return (
    <>
     <BrowserRouter> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/signout' element={<SignOut />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<CheckoutSuccess />} />
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App ;
