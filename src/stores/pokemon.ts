import { atom, selector } from 'recoil';

type LoadingState = 'init' | 'load' | 'finish';

/**
 * 메인화면 로딩 상태
 * 스크롤 여부에 따라 @load / @finish 값으로 변경됨
 * @init : 초기 상태
 * @load : 로딩 중 상태 (스크롤하여 하단에 로더가 브라우져 영역에 들어오는 경우)
 * @finish : 로딩 완로 상태 (다음 offset 조회가 끝난 경우)
 */
export const PokemonLoadingState = atom<LoadingState>({
  key: 'PokemonLoading',
  default: 'init'
});

/**
 * 메인화면 포켓몬 목록
 */
export const PokemonListStore = atom<Pokemon[]>({
  key: 'PokemonList',
  default: []
});

/**
 * 메인화면 상단 검색어
 */
export const PokemonSearchStore = atom<string>({
  key: 'PokemonSearch',
  default: ''
});

/**
 * 메인화면 상단 검색 시
 * PokemonListStore 에서 id로 존재하는 포켓몬인지 조회 하는 selector
 */
export const userPokemonSelector = selector<any>({
  key: 'userPokemonSelector',
  get: ({ get }) => {
    const id = Number(get(PokemonSearchStore)) || 0;
    return get(PokemonListStore).find((pokemon: Pokemon) => pokemon?.id === id);
  }
});
