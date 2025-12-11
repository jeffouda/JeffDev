import React from 'react';

function Hero() {
  return (
    <div style={{ textAlign: 'center', margin: '80px 0' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
        Hi, I'm <span style={{ color: 'var(--accent)' }}>Jeff</span>.
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
        A Full-Stack Developer specializing in <b>FastAPI</b> and <b>React</b>. 
        I build scalable web applications with clean code and modern architecture.
      </p>
      <div style={{ marginTop: '30px' }}>
        <a href="#contact" style={{ 
            backgroundColor: 'var(--text-primary)', 
            color: 'var(--bg-color)', 
            padding: '12px 24px', 
            borderRadius: '6px', 
            fontWeight: 'bold',
            display: 'inline-block'
        }}>
            Get in Touch
        </a>
      </div>
    </div>
  );
}

export default Hero;