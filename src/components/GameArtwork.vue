<script setup>
import { ref } from 'vue';
import selectNewGame from '../views/GuessTheArtwork.vue';

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
const reponse = ref("");
const blurValue = ref(10);
const reponseFausse = ref(false);
const reponseVraie = ref(false);

function play() {
  if(props.game.name.toUpperCase() === reponse.value.toUpperCase() || 
      props.game.alternative_names.map(
        (x) => x.toUpperCase()
      ).includes(reponse.value.toUpperCase())
  ){
    reponseVraie.value = true;
  } else {
    reponseFausse.value = true;
    setTimeout(() => {
      reponseFausse.value = false;
    }, 500);
    
    essais.value--;
    blurValue.value -= 2;
    reponse.value = "";
  }
}
</script>

<template>
  <h1 class="text-2xl md:text-3xl lg:text-5xl font-bold" :class="{'hidden':reponseVraie}">De quel jeu provient cette image ?</h1>    
  <div class="flex flex-col items-center space-y-3 text-xl md:text-2xl text-center w-full" :class="{'hidden':!reponseVraie}">
    <h1 class="title">Bonne réponse bravo !</h1>
    <img
      class="win-gif"
      src="https://media1.tenor.com/m/Cye4eXblZrAAAAAC/shrek-danse.gif"
      @error="$event.target.src='https://via.placeholder.com/300x200?text=Image+non+disponible'"
    />
  </div>
  <div class="w-full">
    <div class="game-card" :class="{ 'animate-shake': reponseFausse, 'hidden': reponseVraie}">
      <img
        :src="game.background_image"
        :alt="game.name"
        :style="{ filter: 'blur(' + blurValue + 'px)' }"
        class="game-image"
        @error="$event.target.src='https://via.placeholder.com/300x200?text=Image+non+disponible'"
      />
    </div>
    <input 
      @keyup.enter="play" 
      type="text" 
      :class="{'input-error':reponseFausse, 'hidden': reponseVraie}"
      class="input input-bordered w-full max-w-xs mt-4" 
      v-model="reponse"
      placeholder="Entrez le nom du jeu"
    />
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Jersey+10+Charted&family=Press+Start+2P&display=swap');



.title{
  font-family: "Press Start 2P", system-ui;
  font-weight: 400;
  font-style: normal;
}



.win-gif {
  width: 100%;
  max-width: 400px;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.game-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.game-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  transition: filter 0.3s ease;
  cursor: pointer;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@media (max-width: 640px) {
  .game-card {
    max-width: 100%;
  }
  
  .input {
    width: 100%;
    max-width: 100%;
  }
}
</style>