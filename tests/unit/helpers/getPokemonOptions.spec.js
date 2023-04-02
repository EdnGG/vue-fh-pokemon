import getPokemonOptions, {
  getPokemons,
  getPokemonNames,
} from "@/helpers/getPokemonOptions";

describe("getPokemonHelpers", () => {
  test("must return an array of numbers", () => {
    const pokemons = getPokemons();
    // console.log(pokemons);
    expect(pokemons.length).toBe(650);
    expect(pokemons[0]).toBe(1);
    expect(pokemons[500]).toBe(501);
    expect(pokemons[649]).toBe(650);
  });

  test("must return an array with 4 elements with pokemon names", async () => {
    const pokemons = await getPokemonNames([1, 2, 3, 4]);

    expect(pokemons).toStrictEqual([
      { name: "bulbasaur", id: 1 },
      { name: "ivysaur", id: 2 },
      { name: "venusaur", id: 3 },
      { name: "charmander", id: 4 },
    ]);
  });

  test("must return an mixed array", async () => {
    const pokemons = await getPokemonOptions();
    /* forma diferente de hacerlo
     * const pokemonsArr = pokemons.splice(0, 4);
     * const mixedPokemons = pokemonsArr.sort(() => Math.random() - 0.5);
     * expect(mixedPokemons).not.toEqual([1, 2, 3, 4]);
     */

    /* Forma de haverlo en el curso*/

    expect(pokemons.length).toBe(4);
    expect(pokemons).toEqual([
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
    ]);
  });
});
