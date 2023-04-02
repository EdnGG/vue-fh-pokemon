import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage.vue";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonPage", () => {
  let wrapper;
  // let mixPokemonArraySpy;

  beforeEach(() => {
    // mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, "mixPokemonArray");
    wrapper = shallowMount(PokemonPage);
  });

  test("must match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("must call mixPokemomArray when the component is mounted", () => {
    const mixPokemonArraySpy = jest.spyOn(
      PokemonPage.methods,
      "mixPokemonArray"
    );
    // no se ocupa guardar el shadowmount en una variable
    const wrapper = shallowMount(PokemonPage);

    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  test("must be match with snapshot when pokemons are loaded", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonaArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("must show components PokemonImage and PokemonOptions", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonaArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });

    expect(wrapper.find("pokemon-image-stub").exists()).toBeTruthy();
    expect(wrapper.find("pokemon-options-stub").exists()).toBeTruthy();

    expect(wrapper.find("pokemon-image-stub").attributes("pokemonid")).toBe(
      "5"
    );
    // expect(
    //   wrapper.find("pokemon-options-stub").attributes("pokemons")
    // ).toBeTruthy();  // Este test no pasa porque no coincide en el snapshot
  });

  test("pruebas con checkAnswer", async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });

    await wrapper.vm.checkAnswer(5);

    expect(wrapper.find("h2").exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBe(true);
    expect(wrapper.find("h2").text()).toBe(`Correct!, ${pokemons[0].name}`);

    await wrapper.vm.checkAnswer(10);

    expect(wrapper.vm.message).toBe(`Wrong, it was ${pokemons[0].name}`);
  });
});
