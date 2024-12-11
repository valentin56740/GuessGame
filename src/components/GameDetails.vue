<script setup>
import { computed } from 'vue';
import { formatReleaseDate, hasAlternativeNames, formatAlternativeNames } from '../utils/gameUtils';

const props = defineProps({
  game: {
    type: Object,
    required: true,
    validator: (value) => {
      return typeof value.name === 'string';
    },
  },
});

const formattedDate = computed(() => formatReleaseDate(props.game.released));
const showAlternativeNames = computed(() => hasAlternativeNames(props.game));
const alternativeNamesString = computed(() => formatAlternativeNames(props.game.alternative_names));
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">{{ game.name }}</h2>
    <div v-if="showAlternativeNames" class="text-sm text-gray-600 mb-2">
      Also known as: {{ alternativeNamesString }}
    </div>
    <div class="flex justify-between text-sm text-gray-500">
      <span>Released: {{ formattedDate }}</span>
      <span v-if="game.metacritic">Rating: {{ game.metacritic }}%</span>
    </div>
  </div>
</template>