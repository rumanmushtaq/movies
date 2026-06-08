<script setup>
import { ref } from 'vue'

const isVisible = ref(true)

const closeBanner = () => {
  isVisible.value = false
}
</script>

<template>
  <div v-if="isVisible" class="top-banner">
    <div class="container banner-content">
      <span class="badge">NEW</span>
      <p>Experience the all-new Cinematic Streaming Platform. Upgrade to Premium for 4K viewing!</p>
      <button @click="closeBanner" class="close-btn" aria-label="Close banner">✕</button>
    </div>
  </div>
</template>

<style scoped>
.top-banner {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 0;
  position: relative;
  z-index: 1001; /* Above navbar */
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  padding-right: 2rem; /* space for close button */
  position: relative;
}

.badge {
  background-color: white;
  color: var(--primary-color);
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.close-btn {
  background: transparent;
  color: white;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.close-btn:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 2rem 0.5rem 0.5rem;
  }
}
</style>
