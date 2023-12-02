// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Route, Routes } from 'react-router-dom';
import Header from './shared/header';
import Home from './pages/home';
import Footer from './shared/footer';
import Contact from './pages/contact';
import About from './pages/about';
import CarList from './pages/car/list';
import CarDetails from './pages/car/single';
import { SignIn } from './pages/authentication/signin';
import { SignUp } from './pages/authentication/signup';
import Error404 from './pages/errors/error404';
import Dashboard from './pages/user/dashboard';
import Profile from './pages/user/profile';
import Order from './pages/user/order';
import Invoice from './pages/user/invoice';
import Verify from './pages/authentication/verify';
import { PrivateRoute } from './utils/protectedRoutes';

export function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/email/verify" element={<Verify />} />
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/orders"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/invoices"
          element={
            <PrivateRoute>
              <Invoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
