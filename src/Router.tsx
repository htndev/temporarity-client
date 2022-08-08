import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { NotFound } from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
