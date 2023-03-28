import { POKE_IMG_BASE_URL } from 'src/const';

/**
 * character 페이지에서 url의 query 파싱할 때 사용
 * @param key
 * @param queryString
 * @returns
 */
export const parsePathQuery = (key: string, queryString: string) => {
  const params = new URLSearchParams(queryString);
  const value = params.get(key);
  return value;
};

/**
 * pokeapi Graphql로부터 조회된
 * 포켓몬 가본정보 파싱
 * - '/' (목록)
 * @param poke
 * @returns
 */
export const paresPokemon = (poke: any) => {
  const id = poke?.id;
  const name = poke?.name;
  const koName = poke?.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames?.[0]?.name;
  const src = `${POKE_IMG_BASE_URL}/${id}.png`;

  const result = { id, name, koName, src };
  return result;
};

const paresEvolutionPokemon = (poke: any) => {
  const id = poke?.id;
  const name = poke?.name;
  const koName = poke?.pokemon_v2_pokemonspeciesnames?.[0]?.name;
  const src = `${POKE_IMG_BASE_URL}/${id}.png`;

  const result = { id, name, koName, src };
  return result;
};

/**
 * pokeapi Graphql로부터 조회된
 * 포켓몬 스펙 정보 파싱
 * - '/' (검색)
 * - '/character'
 * @param poke
 * @returns
 */
export const paresPokemonSpec = (poke: any) => {
  const id = poke?.id;
  const name = poke?.name;
  const koName = poke?.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames?.[0]?.name || name;
  const flavor_text = poke?.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts?.[0]?.flavor_text || '정보가 잆습니다.';
  const evolutionchain = poke?.pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies;

  const src = `${POKE_IMG_BASE_URL}/${id}.png`;
  const evolutions = evolutionchain?.map((ev: any) => paresEvolutionPokemon(ev));

  const result = { id, name, koName, src, flavor_text, evolutions };
  return result;
};
