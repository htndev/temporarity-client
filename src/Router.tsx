import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Welcome } from './pages/Welcome';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Workspaces = lazy(() => import('./pages/Workspaces'));
const Workspace = lazy(() => import('./pages/Workspace'));
const NotFound = lazy(() => import('./pages/SignUp'));

export const Router = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/workspaces" element={<Workspaces />} />
    <Route path="/workspaces/:slug" element={<Workspace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
