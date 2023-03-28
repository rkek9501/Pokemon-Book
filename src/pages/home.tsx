import React, { useEffect, useLayoutEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from '@apollo/client';

import PokeList from "src/components/pokeList";
import PokeListCounter from "src/components/pokeListCounter";
import Layout from "src/containers/layout";

import { PokemonListStore, PokemonLoadingState } from "src/stores/pokeList";
import { paresPokemon } from "src/utils/parser";
import { GET_LIST } from "src/query/getPokemonList";

const Home = () => {
  const pokeList = useRecoilValue(PokemonListStore);
  const loading = useRecoilValue(PokemonLoadingState);
  const setPokeList = useSetRecoilState(PokemonListStore);
  const setLoading = useSetRecoilState(PokemonLoadingState);

  const {refetch} = useQuery(GET_LIST, {
    variables: { offset: 0 },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted(response) {
      const pokemons = response?.pokemon_v2_pokemon?.map((poke: any) => {
        return paresPokemon(poke);
      });
      setPokeList((prev: Pokemon[]) => (prev).concat(...pokemons));
      setLoading("finish");
    },
  });

  useLayoutEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (loading === "load") {
      const offset = pokeList.length;
      console.log({offset});
      refetch({offset});
    }
}, [pokeList, loading]);

  return (<Layout>
    <PokeListCounter count={pokeList?.length} />
    <PokeList withLoader list={pokeList} />
  </Layout>);
};

export default Home;
