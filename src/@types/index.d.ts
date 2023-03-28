declare type Pokemon = {
  id: number;
  name: string;
  koName: string;
};

declare type PokemonSpec = {
  id: number;
  src: string;
  genus: string;
  name: string;
  flavor_text: string;
  evolutions?: Pokemon[];
};
