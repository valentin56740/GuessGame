<script setup>
import { ref, onMounted } from 'vue';
import { games } from '../data/games';
import { getRandomGame } from '../utils/gameUtils';
import GameCard from '../components/GameCard.vue';

const currentGame = ref(null);
const gameCardRef = ref(null);

const selectRandomGame = () => {
  currentGame.value = getRandomGame(games);
  gameCardRef.value?.reset();
};

onMounted(() => {
  selectRandomGame();
});
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <header class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-2">Guess The Game</h1>
      <p class="text-gray-600">Click the image to reveal the game</p>
    </header>

    <main>
      <div v-if="currentGame" class="space-y-4">
        <GameCard
          ref="gameCardRef"
          :game="currentGame"
        />
        <button
          @click="selectRandomGame"
          class="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Next Game
        </button>
      </div>
    </main>
  </div>
</template>