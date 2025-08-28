import './App.css'
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

function App() {

  return (
    <>
    <div className="container">
      <div className="header"><Header/></div>
      <div className="menu"><TopMenu/></div>
      <div className="content">
        <Routes>
          <Route index element={<About />} />
          <Route path="/novels" element={<Novels />} />
          <Route path="/shortstories" element={<ShortStories />} />   
          <Route path="/plays" element={<Plays />} />   
        </Routes>
      </div>
      <div className="footer"><Footer/>
      </div>
    </div>
    </>
  )
}

export default App;