import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <section id="about">
          <About />
        </section>
        <section id="timeline">
          <Timeline />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <section id="footer">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default App;