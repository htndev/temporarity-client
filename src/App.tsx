import { FC, Suspense } from 'react';
import './App.css';
import { LoadingScreen } from './components/common/LoadingScreen';
import { WatchLanguage } from './components/common/WatchLanguage';
import { Router } from './Router';

const App: FC = () => (
  <div className="app">
    <Suspense fallback={<LoadingScreen />}>
      <WatchLanguage>
        <Router />
      </WatchLanguage>
    </Suspense>
  </div>
);

export default App;
