<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="container nav-container">
      <router-link to="/" class="logo">
        <span class="logo-icon">🎬</span>
        <span class="logo-text">CINE<span class="text-accent">MAX</span></span>
      </router-link>

      <nav class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/explore">Explore</router-link>
        <router-link to="/projects">Projects</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>

      <div class="nav-actions">
        <button class="btn btn-primary login-btn">Sign In</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: all 0.3s ease;
  background: transparent;
}

.navbar-scrolled {
  padding: 1rem 0;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: -1px;
}

.text-accent {
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-links a {
  font-weight: 500;
  color: var(--text-color);
  transition: color 0.3s ease;
  font-size: 1.05rem;
  opacity: 0.8;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: white;
  opacity: 1;
}

.login-btn {
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>
