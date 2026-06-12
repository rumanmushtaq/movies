<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MovieCard from '../components/MovieCard.vue'

// --- Hero Slider Logic ---
const currentSlide = ref(0)
const sliderInterval = ref(null)
const videoPlayer = ref(null)
const rowSections = ref([])
const scrollY = ref(0)

const heroSlides = [
  {
    id: 1,
    type: 'video', 
    title: 'TEARS OF STEEL',
    subtitle: 'A group of warriors and scientists try to save the world from destructive robots in this stunning sci-fi epic.',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&q=80',
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
  if (heroSlides[currentSlide.value].type === 'video' && videoPlayer.value && videoPlayer.value[0]) {
    videoPlayer.value[0].currentTime = 0
    videoPlayer.value[0].play().catch(e => console.log('Autoplay prevented:', e))
  }
}

const resetInterval = () => {
  if (sliderInterval.value) clearInterval(sliderInterval.value)
  const delay = heroSlides[currentSlide.value].type === 'video' ? 15000 : 7000
  sliderInterval.value = setInterval(nextSlide, delay)
}

const handleScroll = () => {
  scrollY.value = window.scrollY
}

// --- Row Scroll Helpers ---
const scrollRow = (rowEl, direction) => {
  if (!rowEl) return
  const scrollAmount = direction === 'right' ? 800 : -800
  rowEl.scrollBy({ left: scrollAmount, behavior: 'smooth' })
}

const trendingRow  = ref(null)
const actionRow    = ref(null)
const sciFiRow     = ref(null)
const dramaRow     = ref(null)

// --- Intersection Observer for Premium Reveal Animations ---
onMounted(() => {
  resetInterval()
  handleVideoPlayback()
  window.addEventListener('scroll', handleScroll, { passive: true })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        // Unobserve after animating so it doesn't replay constantly
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  rowSections.value.forEach(section => {
    if (section) observer.observe(section)
  })
})

onUnmounted(() => {
  if (sliderInterval.value) clearInterval(sliderInterval.value)
  window.removeEventListener('scroll', handleScroll)
})

// --- Movie Rows Data ---
const trendingMovies = ref([
  { id: 101, title: 'Dune: Part Two',              image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=500&q=80', year: '2024', rating: '8.8' },
  { id: 102, title: 'Oppenheimer',                 image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80', year: '2023', rating: '8.6' },
  { id: 103, title: 'Poor Things',                 image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&q=80', year: '2023', rating: '8.2' },
  { id: 104, title: 'Spider-Man',                  image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80', year: '2023', rating: '8.4' },
  { id: 105, title: 'The Batman',                  image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&q=80', year: '2022', rating: '7.7' },
  { id: 106, title: 'Killers of the Flower Moon',  image: 'https://images.unsplash.com/photo-1481026469463-66327c86e544?w=500&q=80', year: '2023', rating: '7.6' },
  { id: 107, title: 'Past Lives',                  image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&q=80', year: '2023', rating: '7.9' },
  { id: 108, title: 'Maestro',                     image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500&q=80', year: '2023', rating: '6.8' },
  { id: 109, title: 'Saltburn',                    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80', year: '2023', rating: '7.1' },
])

const actionMovies = ref([
  { id: 201, title: 'John Wick: Chapter 4',        image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&q=80', year: '2023', rating: '7.8' },
  { id: 202, title: 'Mission: Impossible',          image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80', year: '2023', rating: '7.7' },
  { id: 203, title: 'Top Gun: Maverick',            image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=500&q=80', year: '2022', rating: '8.3' },
  { id: 204, title: 'Mad Max: Fury Road',           image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80', year: '2015', rating: '7.5' },
  { id: 205, title: 'The Dark Knight',              image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&q=80', year: '2008', rating: '9.0' },
  { id: 206, title: 'Black Panther',               image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80', year: '2018', rating: '7.3' },
  { id: 207, title: 'Gladiator',                   image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80', year: '2000', rating: '8.5' },
  { id: 208, title: 'Die Hard',                    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80', year: '1988', rating: '8.2' },
  { id: 209, title: 'Heat',                        image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80', year: '1995', rating: '8.3' },
])

const sciFiMovies = ref([
  { id: 301, title: 'Interstellar',                image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=500&q=80', year: '2014', rating: '8.6' },
  { id: 302, title: 'Blade Runner 2049',            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80', year: '2017', rating: '8.0' },
  { id: 303, title: 'Arrival',                     image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&q=80', year: '2016', rating: '7.9' },
  { id: 304, title: 'The Matrix',                  image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80', year: '1999', rating: '8.7' },
  { id: 305, title: '2001: A Space Odyssey',       image: 'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?w=500&q=80', year: '1968', rating: '8.3' },
  { id: 306, title: 'Alien',                       image: 'https://images.unsplash.com/photo-1475070929565-c985b496cb9f?w=500&q=80', year: '1979', rating: '8.5' },
  { id: 307, title: 'Ex Machina',                  image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&q=80', year: '2014', rating: '7.7' },
  { id: 308, title: 'Gravity',                     image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=500&q=80', year: '2013', rating: '7.7' },
  { id: 309, title: 'Inception',                   image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&q=80', year: '2010', rating: '8.8' },
])

const dramaMovies = ref([
  { id: 401, title: 'Fight Club',                  image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80', year: '1999', rating: '8.8' },
  { id: 402, title: 'The Godfather',               image: 'https://images.unsplash.com/photo-1481026469463-66327c86e544?w=500&q=80', year: '1972', rating: '9.2' },
  { id: 403, title: 'Seven',                       image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80', year: '1995', rating: '8.6' },
  { id: 404, title: 'Prisoners',                   image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80', year: '2013', rating: '8.1' },
  { id: 405, title: "Schindler's List",            image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500&q=80', year: '1993', rating: '9.0' },
  { id: 406, title: 'Whiplash',                    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&q=80', year: '2014', rating: '8.5' },
  { id: 407, title: 'Parasite',                    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80', year: '2019', rating: '8.5' },
  { id: 408, title: 'The Shawshank Redemption',    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&q=80', year: '1994', rating: '9.3' },
  { id: 409, title: 'Joker',                       image: 'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?w=500&q=80', year: '2019', rating: '8.4' },
])
</script>

<template>
  <div class="home">
    <!-- Dynamic Hero Slider Section with Scroll Parallax -->
    <section class="hero-slider">
      <transition-group name="slide-fade" tag="div" class="slider-track">
        <div 
          v-for="(slide, index) in heroSlides" 
          :key="slide.id"
          v-show="currentSlide === index"
          class="hero-slide"
        >
          <!-- Video or Image Backdrop with Parallax Translation -->
          <div class="hero-backdrop" :style="{ transform: `translateY(${scrollY * 0.4}px)` }">
            <template v-if="slide.type === 'video'">
              <video 
                ref="videoPlayer"
                :src="slide.videoSrc"
                :poster="slide.poster" 
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
          
          <div class="container hero-container" :style="{ transform: `translateY(${scrollY * 0.25}px)`, opacity: 1 - scrollY / 600 }">
            <div class="hero-content">
              <div class="hero-meta animated-item delay-1">
                <span class="badge">{{ slide.badge }}</span>
                <span class="rating">⭐ {{ slide.rating }}</span>
                <span class="year">{{ slide.year }}</span>
                <span class="genre">{{ slide.genre }}</span>
              </div>
              
              <!-- Mask reveal text for Hero Title -->
              <div class="reveal-mask">
                <h1 class="hero-title animated-reveal delay-2">{{ slide.title }}</h1>
              </div>
              
              <div class="reveal-mask">
                <p class="hero-subtitle animated-reveal delay-3">{{ slide.subtitle }}</p>
              </div>

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
      <div class="slider-pagination container" :style="{ opacity: 1 - scrollY / 300 }">
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
    <section class="movie-row-section fade-up-section" :ref="el => { if (el) rowSections.push(el) }">
      <div class="container">
        <div class="row-header">
          <div class="reveal-mask">
            <h2 class="row-title scroll-reveal-text">Trending Now</h2>
          </div>
          <div class="row-arrows">
            <button class="arrow-btn" @click="scrollRow(trendingRow, 'left')" aria-label="Scroll left">&#8592;</button>
            <button class="arrow-btn" @click="scrollRow(trendingRow, 'right')" aria-label="Scroll right">&#8594;</button>
          </div>
        </div>
        <div class="movie-row scroll-reveal-cards" ref="trendingRow">
          <MovieCard v-for="movie in trendingMovies" :key="movie.id" :movie="movie" />
        </div>
      </div>
    </section>

    <!-- Action Section -->
    <section class="movie-row-section fade-up-section" :ref="el => { if (el) rowSections.push(el) }">
      <div class="container">
        <div class="row-header">
          <div class="reveal-mask">
            <h2 class="row-title scroll-reveal-text">Action &amp; Adventure</h2>
          </div>
          <div class="row-arrows">
            <button class="arrow-btn" @click="scrollRow(actionRow, 'left')" aria-label="Scroll left">&#8592;</button>
            <button class="arrow-btn" @click="scrollRow(actionRow, 'right')" aria-label="Scroll right">&#8594;</button>
          </div>
        </div>
        <div class="movie-row scroll-reveal-cards" ref="actionRow">
          <MovieCard v-for="movie in actionMovies" :key="movie.id" :movie="movie" />
        </div>
      </div>
    </section>

    <!-- Sci-Fi Section -->
    <section class="movie-row-section fade-up-section" :ref="el => { if (el) rowSections.push(el) }">
      <div class="container">
        <div class="row-header">
          <div class="reveal-mask">
            <h2 class="row-title scroll-reveal-text">Sci-Fi Masterpieces</h2>
          </div>
          <div class="row-arrows">
            <button class="arrow-btn" @click="scrollRow(sciFiRow, 'left')" aria-label="Scroll left">&#8592;</button>
            <button class="arrow-btn" @click="scrollRow(sciFiRow, 'right')" aria-label="Scroll right">&#8594;</button>
          </div>
        </div>
        <div class="movie-row scroll-reveal-cards" ref="sciFiRow">
          <MovieCard v-for="movie in sciFiMovies" :key="movie.id" :movie="movie" />
        </div>
      </div>
    </section>

    <!-- Drama Section -->
    <section class="movie-row-section fade-up-section" :ref="el => { if (el) rowSections.push(el) }">
      <div class="container">
        <div class="row-header">
          <div class="reveal-mask">
            <h2 class="row-title scroll-reveal-text">Critically Acclaimed Drama</h2>
          </div>
          <div class="row-arrows">
            <button class="arrow-btn" @click="scrollRow(dramaRow, 'left')" aria-label="Scroll left">&#8592;</button>
            <button class="arrow-btn" @click="scrollRow(dramaRow, 'right')" aria-label="Scroll right">&#8594;</button>
          </div>
        </div>
        <div class="movie-row scroll-reveal-cards" ref="dramaRow">
          <MovieCard v-for="movie in dramaMovies" :key="movie.id" :movie="movie" />
        </div>
      </div>
    </section>
    
    <div style="height: 100px;"></div>
  </div>
</template>

<style scoped>
.hero-slider {
  position: relative;
  height: 95vh;
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

.hero-backdrop {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 1;
  overflow: hidden;
  background-color: var(--bg-color-light);
  /* Hardware acceleration for smooth parallax */
  will-change: transform; 
}

.hero-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.image-media {
  transform: scale(1.05);
}

.video-media {
  opacity: 0.8; 
}

.hero-vignette {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 2;
  background: 
    linear-gradient(to top, var(--bg-color) 0%, rgba(5,5,5,0.7) 40%, rgba(5,5,5,0.1) 100%),
    linear-gradient(to right, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0) 60%);
}

.hero-container {
  position: relative;
  z-index: 3;
  width: 100%;
  will-change: transform, opacity;
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
  color: var(--color-accent);
}

/* Premium Reveal Masks (like the-cast.co.uk) */
.reveal-mask {
  overflow: hidden;
  display: block;
}

.hero-title {
  font-size: clamp(3.5rem, 7vw, 6rem);
  font-weight: 900;
  line-height: 1;
  margin-bottom: 1rem;
  letter-spacing: -2px;
  color: var(--primary-color);
  text-shadow: 0 4px 20px rgba(0,0,0,0.8);
  text-transform: uppercase;
  padding-bottom: 10px; /* prevent font clipping */
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--text-color);
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
  box-shadow: 0 10px 20px rgba(232, 180, 74, 0.4);
}

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

.progress-segment.active.video-timing .progress-fill {
  animation: fillProgress 15s linear forwards;
}

/* --- Hero Slide Animations --- */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 1.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.hero-slide .animated-item {
  opacity: 0;
  transform: translateY(30px);
}

.hero-slide .animated-reveal {
  transform: translateY(100%);
  opacity: 0;
}

/* Trigger on active slide */
.hero-slide[style*=""] .animated-item,
.hero-slide:not([style*="display: none"]) .animated-item {
  animation: fadeUpItem 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.hero-slide[style*=""] .animated-reveal,
.hero-slide:not([style*="display: none"]) .animated-reveal {
  animation: maskReveal 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.3s; }
.delay-3 { animation-delay: 0.5s; }
.delay-4 { animation-delay: 0.7s; }

@keyframes fadeUpItem {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes maskReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fillProgress {
  0% { width: 0%; }
  100% { width: 100%; }
}

/* --- Scroll Animations for Movie Rows --- */

/* Parent section doesn't move, just acts as a trigger */
.fade-up-section {
  position: relative;
  z-index: 5;
  padding-bottom: 40px;
}

.row-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--primary-color);
  padding-bottom: 5px; /* Prevent clipping */
}

/* Children elements hide down initially */
.scroll-reveal-text {
  transform: translateY(100%);
  opacity: 0;
  transition: transform 1s cubic-bezier(0.165, 0.84, 0.44, 1),
              opacity 0.8s ease;
}

.scroll-reveal-cards {
  transform: translateY(80px);
  opacity: 0;
  transition: transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s,
              opacity 1s ease 0.2s;
}

/* When parent triggers, slide children up */
.fade-up-section.is-visible .scroll-reveal-text {
  transform: translateY(0);
  opacity: 1;
}

.fade-up-section.is-visible .scroll-reveal-cards {
  transform: translateY(0);
  opacity: 1;
}

/* Movie Row Header with Arrows */
.row-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.row-arrows {
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transform: translateX(10px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* Show arrows when the section is visible */
.fade-up-section.is-visible .row-arrows {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.6s;
}

.arrow-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-color);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease, border-color 0.3s ease,
              transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.3s ease;
  backdrop-filter: blur(8px);
}

.arrow-btn:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  transform: scale(1.15);
  box-shadow: 0 0 20px rgba(232, 180, 74, 0.4);
}

.arrow-btn:active {
  transform: scale(0.95);
}

/* Row Title */
.row-title {
  font-size: 1.5rem;
  font-weight: 700;
  padding-bottom: 5px;
  margin-bottom: 0;
}

/* Movie Rows Layout */
.movie-row {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 1rem 0 2rem 0;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.movie-row::-webkit-scrollbar { display: none; }
.movie-row { -ms-overflow-style: none; scrollbar-width: none; }

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
  .row-arrows { display: none; }
}
</style>
