<script setup>
import GameArtwork from '../components/GameArtwork.vue';
import { ref, onMounted } from 'vue';
import { games } from '../data/games';
import { getRandomGame } from '../utils/gameUtils';

const selectedGame = ref(null);
const gameArtworkRef = ref(null);


const selectNewGame = () => {
  selectedGame.value = getRandomGame(games);
  if (gameArtworkRef.value) {
    gameArtworkRef.value.resetGame();
  }
};

onMounted(() => {
  selectNewGame();
});


</script>

<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center min-h-screen">
      <div class="flex flex-col items-center space-y-32 max-w-2xl">
        <h1 class="text-5xl font-">De quel jeu provient cette image ?</h1>    
        <div v-if="selectedGame" class="game-container">
          <GameArtwork
              ref="gameArtworkRef"
              :key="selectedGame.id"
              :game="selectedGame"
          />
        </div>
        <button @click="selectNewGame" class="btn btn-outline btn-accent flex-none">
          Changer de jeu
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.guess-artwork {
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.header p {
  color: #666;
  font-size: 1.1rem;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.next-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.next-button:hover {
  background-color: #45a049;
}
</style>