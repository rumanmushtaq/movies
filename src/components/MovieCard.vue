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
  width: 220px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.movie-card:hover {
  transform: scale(1.05);
  z-index: 10;
}

.poster-wrapper {
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.movie-card:hover .overlay {
  opacity: 1;
}

.play-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.8);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.movie-card:hover .play-btn {
  transform: scale(1);
}

.play-icon {
  color: white;
  font-size: 1.2rem;
  margin-left: 4px;
}

.info {
  margin-top: 0.75rem;
}

.title {
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
  color: var(--text-color);
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-muted);
}
</style>
