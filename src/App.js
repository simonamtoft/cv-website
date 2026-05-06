import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Header from './components/Header';
import About from './components/About';
import Timeline from './components/Timeline';
import PublicationsEvents from './components/PublicationsEvents';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import ReadingProgress from './components/ReadingProgress';
import PageTransition from './components/PageTransition';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import './styles/App.css';

function AppContent() {
  const location = useLocation();
  useKeyboardNav();
  return (
    <>
      <ReadingProgress />
      <Nav />
      <div className="app-routes">
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/about" element={
            <PageTransition key={location.key}>
              <main className="main-content page-content" id="main-content">
                <About />
              </main>
            </PageTransition>
          } />
          <Route path="/background" element={
            <PageTransition key={location.key}>
              <main className="main-content page-content" id="main-content">
                <Timeline />
              </main>
            </PageTransition>
          } />
          <Route path="/writing" element={
            <PageTransition key={location.key}>
              <main className="main-content page-content" id="main-content">
                <PublicationsEvents />
              </main>
            </PageTransition>
          } />
          <Route path="/contact" element={
            <PageTransition key={location.key}>
              <main className="main-content page-content" id="main-content">
                <Contact />
              </main>
            </PageTransition>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <BackToTop />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
