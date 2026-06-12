<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    title: 'Neon Shadows',
    category: 'Short Film',
    role: 'Co-Production',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    description: 'A cyberpunk neo-noir short exploring the depths of artificial consciousness in a neon-lit dystopia.'
  },
  {
    id: 2,
    title: 'Echoes of Silence',
    category: 'Documentary',
    role: 'Lead Production',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    description: 'An award-winning documentary diving into the lost art of silent filmmaking in the modern era.'
  },
  {
    id: 3,
    title: 'The Last Horizon',
    category: 'Feature Film',
    role: 'VFX & Post-Production',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    description: 'A breathtaking sci-fi epic detailing humanity\'s final voyage across the cosmos.'
  },
  {
    id: 4,
    title: 'Symphony of Lights',
    category: 'Music Video',
    role: 'Full Production',
    image: 'https://images.unsplash.com/photo-1470229722913-7c090be5c520?auto=format&fit=crop&w=800&q=80',
    description: 'A visually stunning musical journey crafted for the Grammy-winning artist "Lumina".'
  },
  {
    id: 5,
    title: 'Crimson Tide',
    category: 'Commercial',
    role: 'Direction',
    image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=800&q=80',
    description: 'A high-octane commercial spot directed for the global launch of Crimson automotive.'
  },
  {
    id: 6,
    title: 'Whispers in the Dark',
    category: 'Short Film',
    role: 'Cinematography',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80',
    description: 'A deeply atmospheric psychological thriller praised for its groundbreaking lighting design.'
  }
])
</script>

<template>
  <div class="projects-page">
    <div class="container">
      <div class="page-header">
        <span class="page-label">Our Work</span>
        <h1 class="page-title">Studio Projects</h1>
        <p class="page-subtitle">A showcase of our cinematic productions, co-productions, and visual effects portfolios.</p>
      </div>

      <div class="projects-grid">
        <article v-for="project in projects" :key="project.id" class="premium-card">
          <div class="card-image-wrapper">
            <img :src="project.image" :alt="project.title" class="card-image" loading="lazy" />
            <div class="card-gradient"></div>
          </div>
          
          <div class="card-content">
            <div class="meta-info">
              <span class="category">{{ project.category }}</span>
              <span class="role">{{ project.role }}</span>
            </div>
            <h3 class="card-title">{{ project.title }}</h3>
            
            <div class="card-hidden-content">
              <p class="card-desc">{{ project.description }}</p>
              <button class="play-btn">
                <span class="play-icon">▶</span>
                <span class="play-text">Watch Trailer</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  padding-top: 120px;
  padding-bottom: 100px;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-label {
  display: inline-block;
  color: var(--primary-color);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.page-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  letter-spacing: -1.5px;
  margin-bottom: 1.25rem;
  line-height: 1;
  color: var(--primary-color);
}

.page-subtitle {
  font-size: 1.15rem;
  color: var(--text-muted);
  max-width: 520px;
  line-height: 1.7;
  text-align: center;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem 3rem;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

/* Premium Card Design */
.premium-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  cursor: pointer;
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), 
              box-shadow 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.premium-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 30px 60px rgba(0,0,0,0.7), 
              0 0 40px rgba(232, 180, 74, 0.15); /* Subtle glow */
}

/* Image Handling */
.card-image-wrapper {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.premium-card:hover .card-image {
  transform: scale(1.1);
}

/* Gradients */
.card-gradient {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(
    to bottom, 
    rgba(5, 5, 5, 0) 0%, 
    rgba(5, 5, 5, 0.2) 40%, 
    rgba(5, 5, 5, 0.95) 100%
  );
  transition: background 0.6s ease;
}

.premium-card:hover .card-gradient {
  background: linear-gradient(
    to bottom, 
    rgba(5, 5, 5, 0.1) 0%, 
    rgba(5, 5, 5, 0.5) 40%, 
    rgba(5, 5, 5, 1) 100%
  );
}

/* Content Layout */
.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2.5rem 2rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.meta-info {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;
  transform: translateY(20px);
  opacity: 0.8;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.premium-card:hover .meta-info {
  transform: translateY(0);
  opacity: 1;
}

.category {
  color: var(--primary-color);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background: rgba(200, 137, 58, 0.15);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.role {
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
}

.card-title {
  font-size: 2rem;
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  transform: translateY(25px);
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.premium-card:hover .card-title {
  transform: translateY(0);
  margin-bottom: 1rem;
}

/* Hidden Content Revealed on Hover */
.card-hidden-content {
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), 
              opacity 0.4s ease;
}

.premium-card:hover .card-hidden-content {
  height: auto;
  opacity: 1;
  padding-top: 0.5rem;
}

.card-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  transform: translateY(10px);
  opacity: 0;
  transition: transform 0.4s ease 0.1s, opacity 0.4s ease 0.1s;
}

.premium-card:hover .card-desc {
  transform: translateY(0);
  opacity: 1;
}

/* Play Button */
.play-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: white;
  font-weight: 700;
  padding: 0;
  font-size: 1rem;
  transform: translateY(10px);
  opacity: 0;
  transition: transform 0.4s ease 0.2s, opacity 0.4s ease 0.2s;
}

.premium-card:hover .play-btn {
  transform: translateY(0);
  opacity: 1;
}

.play-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--primary-color);
  border-radius: 50%;
  font-size: 1rem;
  padding-left: 3px; /* visual center for play icon */
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.play-btn:hover .play-icon {
  transform: scale(1.1);
  background-color: var(--primary-hover);
}

.play-text {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
  position: relative;
}

.play-text::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background-color: white;
  transition: width 0.3s ease;
}

.play-btn:hover .play-text::after {
  width: 100%;
}
</style>
