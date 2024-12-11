<script setup>
import { ref } from 'vue';
import GameDetails from './GameDetails.vue';

const props = defineProps({
  game: {
    type: Object,
    required: true,
    validator: (value) => {
      return typeof value.name === 'string';
    },
  },
});

const essais = ref(5);
const blurValue = ref(10);
const reponse = ref(null);

function play() {
  if (essais.value > 0) {
    essais.value--;
    blurValue.value -= 2;
  }
}

function resetGame() {
  essais.value = 5;
  blurValue.value = 10;
  reponse.value = null;
}

// Expose the resetGame method to the parent component
defineExpose({
  resetGame
});
</script>

<template>
  <div class="game-card">
    <img
      :src="game.background_image"
      :alt="game.name"
      :style="{ filter: 'blur(' + blurValue + 'px)' }"
      class="game-image"
      @click="play"
      @error="
        $event.target.src =
          'https://via.placeholder.com/300x200?text=Image+non+disponible'
      "
    />
    <GameDetails :game="game" />
  </div>
</template>

<style scoped>
.game-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.image-container {
  position: relative;
  cursor: pointer;
}

.game-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: filter 0.3s ease;
  cursor: pointer;
}

.game-info {
  padding: 15px;
}
</style>