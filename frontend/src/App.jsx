import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard'; // Import the new card
import ContactForm from './components/ContactForm';
import './App.css'; 

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from FastAPI when the page loads
  useEffect(() => {
    fetch("http://127.0.0.1:8000/projects/") 
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Hero />
      
      <section id="projects">
        <h2 style={{ marginBottom: '30px', borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '5px' }}>
          Featured Work
        </h2>

        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <div style={styles.grid}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
{/* CONTACT SECTION */}
<section id="contact" style={{ marginBottom: '100px', textAlign: 'center' }}>
  <h2 style={{ marginBottom: '30px', marginTop: '60px' }}>Let's Connect</h2>
  <ContactForm />
</section>

<footer style={{ textAlign: 'center', color: '#666', paddingBottom: '20px' }}>
  <p>&copy; 2025 Jeff. Built with React & FastAPI.</p>
</footer>

    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '80px'
  }
};

export default App;