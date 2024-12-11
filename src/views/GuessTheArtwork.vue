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
  <div class="guess-artwork">
    <header class="header">
      <h1>Devine de quel jeu il s'agit</h1>
      <p>Clique sur l'image pour déflouter</p>
    </header>
    <main>
      <div v-if="selectedGame" class="game-container">
        <GameArtwork
          ref="gameArtworkRef"
          :key="selectedGame.id"
          :game="selectedGame"
        />
        <button @click="selectNewGame" class="next-button">Jeu suivant</button>
      </div>
    </main>
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