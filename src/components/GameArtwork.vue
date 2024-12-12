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
const reponseFausse = ref(false) ; 
const reponseVraie = ref(false) ; 
function play() {
  if(props.game.name.toUpperCase() === reponse.value.toUpperCase() || 
      props.game.alternative_names.map(
        (x) => x.toUpperCase()
      ).includes(reponse.value.toUpperCase())
     
   ){
    reponseVraie.value = true ; 
  }else{
      reponseFausse.value = true;
      setTimeout(() => {
        reponseFausse.value = false;
      }, 500); // Réduit à 500ms pour une animation plus rapide
      
      essais.value--;
      blurValue.value -= 2;
      reponse.value = "";
  }
}
</script>

<template>
  <div class="flex flex-col item-center space-y-3 text-2xl text-center" :class="{'hidden':!reponseVraie}">
    <h1>Bonne réponse bravo ! </h1>
    <img
        class="win-gif"
        src="https://media1.tenor.com/m/Cye4eXblZrAAAAAC/shrek-danse.gif"
        @error="
          $event.target.src =
            'https://via.placeholder.com/300x200?text=Image+non+disponible'
        "
      />
  </div>
    <div class="game-card" :class="{ 'animate-shake': reponseFausse, 'hidden': reponseVraie}">
      <img
        :src="game.background_image"
        :alt="game.name"
        :style="{ filter: 'blur(' + blurValue + 'px)' }"
        class="game-image"
        @error="
          $event.target.src =
            'https://via.placeholder.com/300x200?text=Image+non+disponible'
        "
      />
  </div>
  <input @keyup.enter="play" type="text" :class="{'input-error':reponseFausse , 'hidden': reponseVraie }" class="input input-bordered" v-model="reponse"/>
</template>

<style scoped>
.win-gif{
   width: 100%;
   height: 400px;
}


.game-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 100%;
  width: 600px;
  margin: 0 auto;
}

.game-image {
  width: 100%;
  height: 400px;
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


</style>