import React from "react";
import "./App.css"; // optional if you want to move CSS out
import Header from './components/Header';
import WorkComponent from './components/Work';
import About from './components/About';
import {
  Routes, Route
} from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";
import Terms from './components/Terms';
import Privacy from './components/PrivacyPolicy';
import logo from '../public/white-home-icon-vector-7151383.png';
import PrivacyPolicy from "./components/PrivacyPolicy";

const App: React.FC = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log('Error boundary reset!');
      }}
    >
    <div className="app">
      <header className="header">
        <nav className="nav" aria-label="Primary">
          <div><a href='/'><img className='logo' src={logo}/></a></div>
          <div className="brand">John DiFelice - Author</div>
          <Header/>
        </nav>
      </header>

      <main className="main">
        <div className="container">
          <Routes>
            <Route index element={<About />} />
            {/* <Route path="/novels" element={<Novels />} />
            <Route path="/shortstories" element={<ShortStories />} />    */}
            <Route path="/works/:writingForm" element={<WorkComponent />} />   
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>© 2025 John DiFelice. All rights reserved.</span>
          <span>
            <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
          </span>
        </div>
      </footer>
    </div>
    </ErrorBoundary>
  );
};

const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

export default App;
