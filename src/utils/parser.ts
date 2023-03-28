import { POKE_IMG_BASE_URL } from "src/const";

export const parsePathQuery = (key: string, queryString: string) => {
  const params = new URLSearchParams(queryString);
  const pokemonName = params.get(key);
  return pokemonName;
};

export const paresPokemon = (poke: any) => {
  const id = poke?.id;
  const name = poke?.name;
  const koName = poke?.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames?.[0]?.name;
  const src = `${POKE_IMG_BASE_URL}/${id}.png`

  const result = { id, name, koName, src };
  return result;
};

const paresEvolutionPokemon = (poke: any) => {
  const id = poke?.id;
  const name = poke?.name;
  const koName = poke?.pokemon_v2_pokemonspeciesnames?.[0]?.name;
  const src = `${POKE_IMG_BASE_URL}/${id}.png`

  const result = { id, name, koName, src };
  return result;
};

export const paresPokemonSpec = (poke: any) => {
  const id = poke?.id;
  const name = poke?.name;
  const koName = poke?.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames?.[0]?.name || name;
  const flavor_text = poke?.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts?.[0]?.flavor_text || "정보가 잆습니다.";
  const evolutionchain = poke?.pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies;

  const src = `${POKE_IMG_BASE_URL}/${id}.png`
  const evolutions = evolutionchain?.map((ev: any) => paresEvolutionPokemon(ev));

  const result = { id, name, koName, src, flavor_text, evolutions };
  return result;
};
