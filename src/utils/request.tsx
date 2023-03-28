import cachingRequest from "./cachingRequest";

const LIMIT = 20;
type IdOrName = string | number | null;

/**
 * 페이지 번호로 포켓몬 목록 조회 20개씩
 * @param page
 * @returns 
 */
export const getPokeList = async (page: number) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${(page-1) * LIMIT}`;
  const response = await cachingRequest(url);

  if (response?.results?.length > 0) {
    return response?.results;
  }
  return [];
};

/**
 * 리스트에서 한국어인 항목 키에 따라 텍스트 불러오는 함수
 * @param key 
 * @param list 
 * @returns 
 */
const getKoText = (key: string, list: any[]) => {
  const find = list.find((item) => item.language?.name === "ko");
  if (find) return find?.[key];
  return undefined;
};

/**
 * evolution_chain 파싱
 * @param evolution 
 * @returns 
 */
const parseEvolutionChain: any = (evolution: any) => {
  if (evolution?.evolves_to?.length > 0) {
    const list = [];
    for (const evolve of evolution?.evolves_to) {
      const child = parseEvolutionChain(evolve);
      list.push(...child);
    }
    return [evolution?.species, ...list];
  }
  return [evolution?.species];
};

/**
 * 포켓몬 아이디 혹은 이름에 따라 정보 조회
 * @param idOrName
 * @returns 
 */
export const getPokemonSpec = async (idOrName: IdOrName) => {
  if (!idOrName) return null;

  // 기본 정보 조회
  const url = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
  const pokemon = await cachingRequest(url);
  const id = pokemon.id; // 포켓몬 id
  const src = pokemon?.sprites?.front_shiny; // 포켓몬 이미지 경로

  // 스펙 조회
  const specUrl = `https://pokeapi.co/api/v2/pokemon-species/${idOrName}`;
  const spec = await cachingRequest(specUrl);
  if (!spec) {
    return { id, src, name: idOrName, genus: "", flavor_text: "", evolutionUrl: "" };
  }

  const name = getKoText("name", spec?.names) || idOrName; // 이름
  const genus = getKoText("genus", spec.genera); // 분류
  const flavor_text = getKoText("flavor_text", spec.flavor_text_entries); // 설명
  const evolutionUrl = spec?.evolution_chain?.url; // 진화 관련 URL

  return { id, src, genus, name, flavor_text, evolutionUrl };
};

/**
 * 기본 정보와 스펙을 기반으로 진화 정보 조회
 * @param idOrName
 * @returns 
 */
export const getPokemonSpecWithEvolution = async (idOrName: IdOrName) => {
  if (!idOrName) return null;
  
  const specs = await getPokemonSpec(idOrName);
  if(!specs) return null;

  const { id, src, genus, name, flavor_text, evolutionUrl } = specs;

  const evolutions = [];
  if (evolutionUrl) {
    const evol = await cachingRequest(evolutionUrl);
    const evolutionChain = parseEvolutionChain(evol.chain);
    evolutions.push(...evolutionChain);
  }

  return { id, src, genus, name, flavor_text, evolutions };
};
