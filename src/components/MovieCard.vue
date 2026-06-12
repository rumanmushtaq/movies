<script setup>
defineProps({
  movie: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="movie-card">
    <router-link :to="`/movie/${movie.id}`" class="card-link">
      <div class="poster-wrapper">
        <img :src="movie.image" :alt="movie.title" class="poster" loading="lazy" />
        <div class="overlay">
          <div class="play-btn">
            <span class="play-icon">▶</span>
          </div>
        </div>
      </div>
      <div class="info">
        <h3 class="title">{{ movie.title }}</h3>
        <div class="meta">
          <span class="year">{{ movie.year }}</span>
          <span class="rating">⭐ {{ movie.rating }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.movie-card {
  flex: 0 0 auto;
  width: 250px; /* Slightly wider for a more cinematic feel */
  cursor: pointer;
  perspective: 1000px;
}

.card-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
}

.poster-wrapper {
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.6);
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              box-shadow 0.5s ease;
  background-color: var(--bg-color-light); /* fallback while loading */
}

/* Premium Lift & Glow Effect */
.movie-card:hover .poster-wrapper {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0,0,0,0.8), 
              0 0 30px rgba(200, 137, 58, 0.15); /* Subtle cinematic glow */
  z-index: 10;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;
}

/* Internal Image Zoom */
.movie-card:hover .poster {
  transform: scale(1.1);
}

/* Deep Cinematic Gradient Overlay */
.overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(
    to bottom, 
    rgba(5, 5, 5, 0.8) 0%, 
    rgba(5, 5, 5, 0.1) 40%, 
    rgba(5, 5, 5, 0.9) 100%
  );
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.4s ease;
}

.movie-card:hover .overlay {
  opacity: 1;
}

/* Glowing Play Button */
.play-btn {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.5) translateY(30px);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 0 25px rgba(200, 137, 58, 0.7);
}

.movie-card:hover .play-btn {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.play-btn:hover {
  background-color: var(--primary-hover);
  transform: scale(1.1) translateY(0);
}

.play-icon {
  color: white;
  font-size: 1.5rem;
  margin-left: 6px; /* perfectly center optical weight */
}

/* Polished Typography */
.info {
  margin-top: 1.2rem;
  padding: 0 4px;
}

.title {
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.35rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

/* Title Color Shift on Hover */
.movie-card:hover .title {
  color: var(--primary-color);
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
}
</style>
