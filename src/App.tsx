import { Suspense } from 'react';
import './App.css';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Router } from './Router';

const App = () => (
  <div className="app">
    <Suspense fallback={<LoadingScreen />}>
      <Router />
    </Suspense>
  </div>
);

export default App;
