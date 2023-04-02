import pokemonApi from "@/api/pokemonApi";

describe("Testing pokemonApi", () => {
  test("Axios must point to pokemon api", () => {
    expect(pokemonApi.defaults.baseURL).toBe(
      "https://pokeapi.co/api/v2/pokemon"
    );
    // console.log(pokemonApi);
  });
});
