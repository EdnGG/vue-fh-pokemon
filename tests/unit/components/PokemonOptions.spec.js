import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions.vue";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonOptions", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons,
      },
    });
  });

  test("must match with snapshot", () => {
    // console.log(wrapper.html());
    expect(wrapper.html()).toMatchSnapshot();
    // expect(wrapper.html()).toMatchInlineSnapshot(); //no se usa mucho
  });

  test("must show the 4 options correctly", () => {
    const liElements = wrapper.findAll("li");
    expect(liElements.length).toBe(4);
    expect(liElements[0].text()).toBe("pikachu");
    expect(liElements[1].text()).toBe("ivysaur");
    expect(liElements[2].text()).toBe("venusaur");
    expect(liElements[3].text()).toBe("mew");
  });

  test('must execute "selectPokemon" with the right argument when an option is clicked', () => {
    const liElements = wrapper.findAll("li");
    const [li1, li2, li3, li4] = liElements;
    li1.trigger("click");
    li2.trigger("click");
    li3.trigger("click");
    li4.trigger("click");

    expect(wrapper.emitted("selectPokemon").length).toBe(4);
    expect(wrapper.emitted("selectPokemon")[0]).toEqual([5]);
    expect(wrapper.emitted("selectPokemon")[1]).toEqual([2]);
    expect(wrapper.emitted("selectPokemon")[2]).toEqual([3]);
    expect(wrapper.emitted("selectPokemon")[3]).toEqual([20]);
  });
});
