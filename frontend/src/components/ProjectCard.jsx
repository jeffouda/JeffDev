import React from 'react';

function ProjectCard({ project }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{project.title}</h3>
      <p style={styles.desc}>{project.description}</p>
      
      <div style={styles.tags}>
        {/* We split the string "Python, React" into separate badges */}
        {project.tech_stack.split(',').map((tech, index) => (
          <span key={index} style={styles.tag}>
            {tech.trim()}
          </span>
        ))}
      </div>

      <div style={styles.links}>
        <a 
          href={project.github_link} 
          target="_blank" 
          rel="noreferrer" 
          style={styles.link}
        >
          GitHub Code
        </a>
        
        {project.live_link && (
          <a 
            href={project.live_link} 
            target="_blank" 
            rel="noreferrer" 
            style={{...styles.link, color: 'var(--accent)'}}
          >
            Live Demo →
          </a>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'var(--card-bg)', // Uses variables from App.css
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #334155',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: '1.25rem',
    marginBottom: '10px',
    color: 'var(--text-primary)'
  },
  desc: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    marginBottom: '20px',
    lineHeight: '1.5'
  },
  tags: {
    marginBottom: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  tag: {
    backgroundColor: '#334155',
    color: '#e2e8f0',
    fontSize: '0.75rem',
    padding: '4px 10px',
    borderRadius: '20px',
    fontWeight: '500'
  },
  links: {
    display: 'flex',
    gap: '15px',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  },
  link: {
    color: 'var(--text-primary)',
    textDecoration: 'none'
  }
};

export default ProjectCard;