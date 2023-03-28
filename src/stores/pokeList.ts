import { atom } from 'recoil';

export const PokemonPageState = atom<number>({
  key: 'PokemonPage',
  default: 1,
});

export const PokemonLoadingState = atom<boolean>({
  key: 'PokemonLoading',
  default: false,
});

export const PokemonListState = atom<Pokemon[]>({
  key: 'PokemonList',
  default: [],
});
