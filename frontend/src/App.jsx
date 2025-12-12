import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Import Router tools
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ContactForm from './components/ContactForm';
import AdminPanel from './components/AdminPanel'; // Import Admin
import './App.css'; 

// 1. Create a "Home" component for your main page
function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/projects/") 
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <section id="projects">
        <h2 style={{ marginBottom: '30px', borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '5px' }}>Featured Work</h2>
        {loading ? <p>Loading...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '80px' }}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
      <section id="contact" style={{ marginBottom: '100px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '30px', marginTop: '60px' }}>Let's Connect</h2>
        <ContactForm />
      </section>
      <footer style={{ textAlign: 'center', color: '#666', paddingBottom: '20px' }}>
        <p>&copy; 2025 Jeff. <Link to="/admin" style={{color: '#333'}}>Admin</Link></p>
      </footer>
    </>
  );
}

// 2. The Main App handles the switching
function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;