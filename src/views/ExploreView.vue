<script setup>
import { ref, computed } from 'vue'
import MovieCard from '../components/MovieCard.vue'

const searchQuery = ref('')
const activeGenre = ref('All')

const genres = ['All', 'Action', 'Sci-Fi', 'Drama', 'Thriller']

const allMovies = ref([
  { id: 101, title: 'Dune: Part Two', genre: 'Sci-Fi', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=500&q=80', year: '2024', rating: '8.8' },
  { id: 102, title: 'Oppenheimer', genre: 'Drama', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80', year: '2023', rating: '8.6' },
  { id: 201, title: 'John Wick: Chapter 4', genre: 'Action', image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&q=80', year: '2023', rating: '7.8' },
  { id: 106, title: 'Interstellar', genre: 'Sci-Fi', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80', year: '2014', rating: '8.6' },
  { id: 105, title: 'The Batman', genre: 'Action', image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&q=80', year: '2022', rating: '7.7' },
  { id: 301, title: 'Seven', genre: 'Thriller', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80', year: '1995', rating: '8.6' },
  { id: 103, title: 'Poor Things', genre: 'Drama', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&q=80', year: '2023', rating: '8.2' },
  { id: 302, title: 'Prisoners', genre: 'Thriller', image: 'https://images.unsplash.com/photo-1505686994434-e3fbc4459385?w=500&q=80', year: '2013', rating: '8.1' }
])

const filteredMovies = computed(() => {
  return allMovies.value.filter(movie => {
    const matchesGenre = activeGenre.value === 'All' || movie.genre === activeGenre.value
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesGenre && matchesSearch
  })
})
</script>

<template>
  <div class="explore-page">
    <div class="container">
      <div class="page-header">
        <h1 class="title">Explore Movies</h1>
      </div>

      <div class="controls glass">
        <div class="search-wrapper">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search for movies..." 
            class="search-input"
          />
        </div>
        
        <div class="genre-filters">
          <button 
            v-for="genre in genres" 
            :key="genre"
            @click="activeGenre = genre"
            :class="['filter-btn', { active: activeGenre === genre }]"
          >
            {{ genre }}
          </button>
        </div>
      </div>

      <div v-if="filteredMovies.length === 0" class="no-results">
        <h3>No movies found.</h3>
      </div>

      <div v-else class="movies-grid">
        <MovieCard 
          v-for="movie in filteredMovies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.explore-page {
  padding-top: 120px;
  padding-bottom: 80px;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 2rem;
}

.controls {
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.genre-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  background-color: rgba(255,255,255,0.05);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover {
  background-color: rgba(255,255,255,0.1);
  color: white;
}

.filter-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.no-results {
  text-align: center;
  padding: 5rem 0;
  color: var(--text-muted);
}

@media (min-width: 768px) {
  .controls {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .search-wrapper {
    flex: 1;
    max-width: 400px;
  }
}
</style>
