<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// In a real app, you would fetch details using the ID: route.params.id
// Using dummy data for demonstration
const movie = ref({
  id: route.params.id,
  title: 'Dune: Part Two',
  genre: 'Sci-Fi',
  image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80',
  poster: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=500&q=80',
  year: '2024',
  rating: '8.8',
  duration: '2h 46m',
  director: 'Denis Villeneuve',
  cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
  description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.'
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="movie-details-page">
    <div class="backdrop-wrapper">
      <img :src="movie.image" :alt="movie.title" class="backdrop-image" />
      <div class="backdrop-vignette"></div>
      
      <button @click="goBack" class="back-btn glass">
        ← Back
      </button>
    </div>

    <div class="container content-container">
      <div class="movie-info-grid">
        <div class="poster-column">
          <img :src="movie.poster" :alt="movie.title" class="main-poster" />
        </div>
        
        <div class="details-column">
          <div class="meta-tags">
            <span class="tag">{{ movie.year }}</span>
            <span class="tag">{{ movie.rating }} ⭐</span>
            <span class="tag">{{ movie.duration }}</span>
            <span class="tag tag-accent">{{ movie.genre }}</span>
          </div>
          
          <h1 class="movie-title">{{ movie.title }}</h1>
          
          <p class="description">{{ movie.description }}</p>
          
          <div class="credits">
            <div class="credit-item">
              <span class="credit-label">Director</span>
              <span class="credit-value">{{ movie.director }}</span>
            </div>
            <div class="credit-item">
              <span class="credit-label">Cast</span>
              <span class="credit-value">{{ movie.cast.join(', ') }}</span>
            </div>
          </div>
          
          <div class="actions">
            <button class="btn btn-primary btn-large">
              ▶ Play Now
            </button>
            <button class="btn btn-outline btn-large">
              + My List
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-details-page {
  min-height: 100vh;
  padding-bottom: 80px;
}

.backdrop-wrapper {
  position: relative;
  height: 60vh;
  min-height: 400px;
  width: 100%;
}

.backdrop-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.backdrop-vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, var(--bg-color) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.7) 100%);
}

.back-btn {
  position: absolute;
  top: 100px;
  left: 24px;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  z-index: 10;
  transition: transform 0.3s;
}

.back-btn:hover {
  transform: translateX(-5px);
}

.content-container {
  margin-top: -150px;
  position: relative;
  z-index: 5;
}

.movie-info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .movie-info-grid {
    grid-template-columns: 300px 1fr;
  }
}

.main-poster {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.8);
}

.meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.tag {
  color: var(--text-muted);
  font-weight: 600;
  font-size: 1rem;
}

.tag-accent {
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 0 0.5rem;
  border-radius: 4px;
}

.movie-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #d1d5db;
  margin-bottom: 2rem;
  max-width: 800px;
}

.credits {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

.credit-item {
  display: flex;
  gap: 1rem;
}

.credit-label {
  color: var(--text-muted);
  min-width: 80px;
  font-weight: 600;
}

.credit-value {
  color: white;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}
</style>
