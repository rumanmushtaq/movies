<template>
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-brand">
        <div class="logo">
          <span class="logo-icon">🎬</span>
          <span class="logo-text">CINE<span class="text-accent">MAX</span></span>
        </div>
        <p class="footer-desc">Your ultimate destination for premium cinematic experiences. Stream thousands of movies and TV shows on demand.</p>
      </div>
      
      <div class="footer-links">
        <h3>Browse</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/explore">New Releases</router-link></li>
          <li><router-link to="/explore">Top Rated</router-link></li>
        </ul>
      </div>

      <div class="footer-social">
        <h3>Follow Us</h3>
        <div class="social-icons">
          <a href="#" aria-label="Twitter">🐦</a>
          <a href="#" aria-label="YouTube">📺</a>
          <a href="#" aria-label="Instagram">📸</a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Cinemax Streaming. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000;
  border-top: 1px solid var(--border-color);
  padding: 80px 0 30px;
  margin-top: auto;
}

.footer-container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.75rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.text-accent {
  color: var(--primary-color);
}

.footer-desc {
  color: var(--text-muted);
  max-width: 350px;
}

.footer-links h3, .footer-social h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
}

.footer-links ul {
  list-style: none;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: white;
}

.social-icons {
  display: flex;
  gap: 1.25rem;
}

.social-icons a {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  filter: grayscale(100%);
}

.social-icons a:hover {
  transform: translateY(-3px);
  filter: grayscale(0%);
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255,255,255,0.05);
  color: var(--text-muted);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
  }
}
</style>
