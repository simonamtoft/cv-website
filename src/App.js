import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Header from './components/Header';
import About from './components/About';
import Timeline from './components/Timeline';
import PublicationsEvents from './components/PublicationsEvents';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <div className="app-routes">
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/about" element={
          <main className="main-content page-content" id="main-content">
            <About />
          </main>
        } />
        <Route path="/background" element={
          <main className="main-content page-content" id="main-content">
            <Timeline />
          </main>
        } />
        <Route path="/writing" element={
          <main className="main-content page-content" id="main-content">
            <PublicationsEvents />
          </main>
        } />
        <Route path="/contact" element={
          <main className="main-content page-content" id="main-content">
            <Contact />
          </main>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
