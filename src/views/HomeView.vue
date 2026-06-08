<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MovieCard from '../components/MovieCard.vue'

// --- Hero Slider Logic ---
const currentSlide = ref(0)
const sliderInterval = ref(null)
const videoPlayer = ref(null)

const heroSlides = [
  {
    id: 1,
    type: 'video', // Cinematic Video Background
    title: 'TEARS OF STEEL',
    subtitle: 'A group of warriors and scientists try to save the world from destructive robots in this stunning sci-fi epic.',
    videoSrc: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
    badge: 'Exclusive Premiere',
    rating: '9.2',
    year: '2024',
    genre: 'Sci-Fi • Action'
  },
  {
    id: 2,
    type: 'image',
    title: 'DUNE: PART TWO',
    subtitle: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop',
    badge: 'New Release',
    rating: '8.8',
    year: '2024',
    genre: 'Sci-Fi • Adventure'
  },
  {
    id: 3,
    type: 'image',
    title: 'THE BATMAN',
    subtitle: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption.',
    image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=2070&auto=format&fit=crop',
    badge: 'Trending',
    rating: '7.7',
    year: '2022',
    genre: 'Action • Crime'
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % heroSlides.length
  handleVideoPlayback()
}

const setSlide = (index) => {
  currentSlide.value = index
  resetInterval()
  handleVideoPlayback()
}

const handleVideoPlayback = () => {
  // If the current slide has a video, play it from the beginning
  if (heroSlides[currentSlide.value].type === 'video' && videoPlayer.value && videoPlayer.value[0]) {
    videoPlayer.value[0].currentTime = 0
    videoPlayer.value[0].play().catch(e => console.log('Autoplay prevented:', e))
  }
}

const resetInterval = () => {
  if (sliderInterval.value) clearInterval(sliderInterval.value)
  // Give the video slide 15 seconds, image slides 7 seconds
  const delay = heroSlides[currentSlide.value].type === 'video' ? 15000 : 7000
  sliderInterval.value = setInterval(nextSlide, delay)
}

onMounted(() => {
  resetInterval()
  handleVideoPlayback()
})

onUnmounted(() => {
  if (sliderInterval.value) clearInterval(sliderInterval.value)
})

// --- Movie Rows Data ---
const trendingMovies = ref([
  { id: 101, title: 'Dune: Part Two', image: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGjjc9CW.jpg', year: '2024', rating: '8.8' },
  { id: 102, title: 'Oppenheimer', image: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', year: '2023', rating: '8.6' },
  { id: 103, title: 'Poor Things', image: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg', year: '2023', rating: '8.2' },
  { id: 104, title: 'Spider-Man: Across the Spider-Verse', image: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', year: '2023', rating: '8.4' },
  { id: 105, title: 'The Batman', image: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', year: '2022', rating: '7.7' },
  { id: 106, title: 'Interstellar', image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', year: '2014', rating: '8.6' },
  { id: 107, title: 'Blade Runner 2049', image: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', year: '2017', rating: '8.0' },
])

const actionMovies = ref([
  { id: 201, title: 'John Wick: Chapter 4', image: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', year: '2023', rating: '7.8' },
  { id: 202, title: 'Mission: Impossible', image: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPZ30L1hMok2GEx1F.jpg', year: '2023', rating: '7.7' },
  { id: 203, title: 'Top Gun: Maverick', image: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17hXc.jpg', year: '2022', rating: '8.3' },
  { id: 204, title: 'Mad Max: Fury Road', image: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg', year: '2015', rating: '7.5' },
])
</script>

<template>
  <div class="home">
    <!-- Dynamic Hero Slider Section -->
    <section class="hero-slider">
      
      <transition-group name="slide-fade" tag="div" class="slider-track">
        <div 
          v-for="(slide, index) in heroSlides" 
          :key="slide.id"
          v-show="currentSlide === index"
          class="hero-slide"
        >
          <!-- Video or Image Backdrop -->
          <div class="hero-backdrop">
            <template v-if="slide.type === 'video'">
              <video 
                ref="videoPlayer"
                :src="slide.videoSrc" 
                class="hero-media video-media" 
                autoplay 
                muted 
                loop 
                playsinline
              ></video>
            </template>
            <template v-else>
              <img :src="slide.image" :alt="slide.title" class="hero-media image-media" />
            </template>
            <div class="hero-vignette"></div>
          </div>
          
          <div class="container hero-container">
            <div class="hero-content">
              <div class="hero-meta animated-item delay-1">
                <span class="badge">{{ slide.badge }}</span>
                <span class="rating">⭐ {{ slide.rating }}</span>
                <span class="year">{{ slide.year }}</span>
                <span class="genre">{{ slide.genre }}</span>
              </div>
              <h1 class="hero-title animated-item delay-2">{{ slide.title }}</h1>
              <p class="hero-subtitle animated-item delay-3">{{ slide.subtitle }}</p>
              <div class="hero-actions animated-item delay-4">
                <button class="btn btn-primary btn-large">
                  <span class="icon">▶</span> Watch Trailer
                </button>
                <button class="btn btn-outline btn-large">
                  ℹ️ Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Slider Pagination -->
      <div class="slider-pagination container">
        <div class="progress-bars">
          <div 
            v-for="(slide, index) in heroSlides" 
            :key="'nav-'+slide.id"
            class="progress-segment"
            :class="{ 
              'active': currentSlide === index,
              'video-timing': currentSlide === index && slide.type === 'video' 
            }"
            @click="setSlide(index)"
          >
            <div class="progress-fill"></div>
          </div>
        </div>
      </div>
      
    </section>

    <!-- Trending Section -->
    <section class="movie-row-section">
      <div class="container">
        <h2 class="row-title">Trending Now</h2>
        <div class="movie-row">
          <MovieCard v-for="movie in trendingMovies" :key="movie.id" :movie="movie" />
        </div>
      </div>
    </section>

    <!-- Action Section -->
    <section class="movie-row-section">
      <div class="container">
        <h2 class="row-title">Action & Adventure</h2>
        <div class="movie-row">
          <MovieCard v-for="movie in actionMovies" :key="movie.id" :movie="movie" />
        </div>
      </div>
    </section>
    
    <div style="height: 100px;"></div>
  </div>
</template>

<style scoped>
.hero-slider {
  position: relative;
  height: 95vh; /* slightly taller to show off video */
  min-height: 600px;
  overflow: hidden;
  margin-top: -120px;
}

.slider-track {
  width: 100%;
  height: 100%;
  position: relative;
}

.hero-slide {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 120px;
}

/* Background & Vignette */
.hero-backdrop {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 1;
  overflow: hidden;
  background-color: #111;
}

.hero-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.image-media {
  transform: scale(1.05); /* Slight zoom for dramatic effect */
}

/* Smooth fade in for video */
.video-media {
  opacity: 0.8; 
}

/* Dramatic Vignette */
.hero-vignette {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 2;
  background: 
    linear-gradient(to top, var(--bg-color) 0%, rgba(5,5,5,0.7) 40%, rgba(5,5,5,0.1) 100%),
    linear-gradient(to right, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0) 60%);
}

/* Content Styling */
.hero-container {
  position: relative;
  z-index: 3;
  width: 100%;
}

.hero-content {
  max-width: 700px;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.badge {
  background-color: var(--primary-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.rating {
  color: #fbbf24;
}

.hero-title {
  font-size: clamp(3.5rem, 7vw, 6rem);
  font-weight: 900;
  line-height: 0.95;
  margin-bottom: 1.5rem;
  letter-spacing: -2px;
  text-shadow: 0 4px 20px rgba(0,0,0,0.8);
  text-transform: uppercase;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #e5e7eb;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.8);
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn-large {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(229, 9, 20, 0.4);
}

/* Pagination Progress Bars */
.slider-pagination {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  z-index: 10;
}

.progress-bars {
  display: flex;
  gap: 10px;
  max-width: 300px;
}

.progress-segment {
  flex: 1;
  height: 4px;
  background-color: rgba(255,255,255,0.2);
  border-radius: 2px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  width: 0%;
  background-color: var(--primary-color);
}

.progress-segment.active .progress-fill {
  animation: fillProgress 7s linear forwards;
}

/* Different animation duration for video slide */
.progress-segment.active.video-timing .progress-fill {
  animation: fillProgress 15s linear forwards;
}

/* --- Animations --- */

/* Slide Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 1.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

/* Staggered Text Animations */
.hero-slide .animated-item {
  opacity: 0;
  transform: translateY(30px);
}

/* Only animate when the slide is active */
.hero-slide[style*=""] .animated-item,
.hero-slide:not([style*="display: none"]) .animated-item {
  animation: fadeUpItem 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }
.delay-4 { animation-delay: 0.8s; }

@keyframes fadeUpItem {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fillProgress {
  0% { width: 0%; }
  100% { width: 100%; }
}

/* Movie Rows Adjustment */
.movie-row-section {
  position: relative;
  z-index: 5;
  padding-bottom: 40px;
}

.row-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.movie-row {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 1rem 0 2rem 0;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.movie-row::-webkit-scrollbar {
  display: none;
}
.movie-row {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
  .hero-vignette {
    background: linear-gradient(to top, var(--bg-color) 0%, rgba(5,5,5,0.9) 60%, rgba(5,5,5,0.4) 100%);
  }
  .progress-bars {
    max-width: 200px;
    margin: 0 auto;
  }
}
</style>
