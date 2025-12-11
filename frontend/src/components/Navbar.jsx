import React from 'react';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Jeff<span style={{color: 'var(--accent)'}}>.Dev</span></h2>
      <div style={styles.links}>
        <a href="#projects" style={styles.link}>Projects</a>
        <a href="#contact" style={styles.link}>Contact</a>
        <a href="https://github.com/YOUR_GITHUB_USER" target="_blank" style={styles.githubBtn}>
           GitHub Profile
        </a>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #334155',
    marginBottom: '40px'
  },
  logo: { fontSize: '1.5rem' },
  links: { display: 'flex', gap: '20px', alignItems: 'center' },
  link: { color: 'var(--text-secondary)', fontWeight: '500' },
  githubBtn: {
    backgroundColor: 'var(--accent)',
    color: '#0f172a',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 'bold'
  }
};

export default Navbar;