import React from "react";
import "./App.css"; // optional if you want to move CSS out
import Header from './components/Header';
import Footer from './components/Footer';
import TopMenu from './components/TopMenu';
import Novels from './components/Novels';
import ShortStories from './components/ShortStories';
import Plays from './components/Plays';
import {
  Routes, Route
} from 'react-router-dom';

const About = () => {
  return (
      <>
        <h3 style={{textAlign: "center"}}>About</h3><p>Lorem ipsum odor amet, consectetuer adipiscing elit. Ridiculus sit nisl laoreet facilisis aliquet. Potenti dignissim litora eget montes rhoncus sapien neque urna. Cursus libero sapien integer magnis ligula lobortis quam ut.</p>
      </>
  )
}

const App: React.FC = () => {
  return (
    <div className="app">
      {/* Fixed Top Nav */}
      <header className="header">
        <nav className="nav" aria-label="Primary">
          <div className="brand">John DiFelice - Author</div>
          {/* <div>
            <a href="#">Home</a>
            <a href="#">Docs</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div> */}
          <Header/>
        </nav>
      </header>

      {/* Expanding content */}
      <main className="main">
        <div className="container">
          <Routes>
            <Route index element={<About />} />
            <Route path="/novels" element={<Novels />} />
            <Route path="/shortstories" element={<ShortStories />} />   
            <Route path="/plays" element={<Plays />} />   
          </Routes>
          {/* <h1>Welcome</h1>
          <p>
            This middle section grows as much as you need. The footer will remain
            pinned to the bottom when there isn’t much content, and will move
            off-screen (with normal scrolling) when there’s a lot.
          </p>

          <div className="card">
            <h2>Demo Content</h2>
            <p>
              Drop your app’s content here. To test, copy this paragraph a bunch
              of times or add long lists/tables. The header stays fixed; the main
              gets padded at the top so nothing hides under it.
            </p>
          </div>
          
          <div className="card">
            <h2>Demo Content</h2>
            <p>
              Drop your app’s content here. To test, copy this paragraph a bunch
              of times or add long lists/tables. The header stays fixed; the main
              gets padded at the top so nothing hides under it.
            </p>
          </div>
          
          <div className="card">
            <h2>Demo Content</h2>
            <p>
              Drop your app’s content here. To test, copy this paragraph a bunch
              of times or add long lists/tables. The header stays fixed; the main
              gets padded at the top so nothing hides under it.
            </p>
          </div>
          
          <div className="card">
            <h2>Demo Content</h2>
            <p>
              Drop your app’s content here. To test, copy this paragraph a bunch
              of times or add long lists/tables. The header stays fixed; the main
              gets padded at the top so nothing hides under it.
            </p>
          </div>
          
          <div className="card">
            <h2>Demo Content</h2>
            <p>
              Drop your app’s content here. To test, copy this paragraph a bunch
              of times or add long lists/tables. The header stays fixed; the main
              gets padded at the top so nothing hides under it.
            </p>
          </div>
          
          <div className="card">
            <h2>Demo Content</h2>
            <p>
              Drop your app’s content here. To test, copy this paragraph a bunch
              of times or add long lists/tables. The header stays fixed; the main
              gets padded at the top so nothing hides under it.
            </p>
          </div>
          
          <div className="card">
            <h2>Demo Content</h2>
            <p>
              Drop your app’s content here. To test, copy this paragraph a bunch
              of times or add long lists/tables. The header stays fixed; the main
              gets padded at the top so nothing hides under it.
            </p>
          </div> */}
        </div>
      </main>

      {/* Footer pinned to bottom */}
      <footer className="footer">
        <div className="footer-inner">
          <span>© 2025 John DiFelice</span>
          <span>
            <a href="#">Privacy</a> · <a href="#">Terms</a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
