import { atom } from 'recoil';

type LoadingState = "init" | "load" | "finish";

export const PokemonLoadingState = atom<LoadingState>({
  key: 'PokemonLoading',
  default: "init",
});

export const PokemonListStore = atom<Pokemon[]>({
  key: 'PokemonList',
  default: [],
});
