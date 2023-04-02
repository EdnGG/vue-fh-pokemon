<template>
  <h1 v-if="!pokemon">Loading...</h1>

  <div v-else>
    <h1>Hows this Pockemon?</h1>
    <!-- Todo: image -->
    <PokemonImage :pokemonId="pokemon.id" :showPokemon="showPokemon" />

    <!-- Todo optiones -->
    <!-- <PokemonOptions :pokemons="pokemonArr" @select-pokemon="checkAnswer($event)" /> -->
    <PokemonOptions :pokemons="pokemonArr" @select-pokemon="checkAnswer" />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">New Game</button>
    </template>
  </div>
</template>

<script>
import PokemonImage from "@/components/PokemonImage";
import PokemonOptions from "@/components/PokemonOptions";

import getpokemonOptions from "@/helpers/getPokemonOptions";

export default {
  name: "PokemonPage",
  components: {
    PokemonImage,
    PokemonOptions,
  },
  data() {
    return {
      pokemonArr: [],
      // pokemon que se necesita adivinar
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
    };
  },
  methods: {
    newGame() {
      this.showAnswer = false;
      this.showPokemon = false;
      this.pokemon = null;
      this.pokemonArr = [];
      this.mixPokemonArray();
    },
    async mixPokemonArray() {
      this.pokemonArr = await getpokemonOptions();
      // Generar numero aleatorio entre el 0 y el 3
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(id) {
      this.showPokemon = true;
      this.showAnswer = true;

      if (id === this.pokemon.id) {
        this.showPokemon = true;
        this.message = `Correct!, ${this.pokemon.name}`;
      } else {
        this.showPokemon = false;
        this.message = `Wrong, it was ${this.pokemon.name}`;
      }
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>
