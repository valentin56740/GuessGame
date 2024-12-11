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

const blurLevel = ref(10);
const attemptsLeft = ref(5);

const handleImageClick = () => {
  if (attemptsLeft.value > 0) {
    attemptsLeft.value--;
    blurLevel.value = Math.max(0, blurLevel.value - 2);
  }
};

const reset = () => {
  blurLevel.value = 10;
  attemptsLeft.value = 5;
};

defineExpose({ reset });
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="relative aspect-video cursor-pointer" @click="handleImageClick">
      <img
        :src="game.background_image"
        :alt="game.name"
        :style="{ filter: `blur(${blurLevel}px)` }"
        class="w-full h-full object-cover transition-all duration-300"
        @error="$event.target.src = 'https://via.placeholder.com/640x360?text=Image+Not+Available'"
      />
      <div class="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded">
        {{ attemptsLeft }} clicks left
      </div>
    </div>
    <GameDetails :game="game" />
  </div>
</template>