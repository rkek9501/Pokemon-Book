import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLazyQuery } from '@apollo/client';

import PokeListCounter from "src/components/pokeListCounter";
import PokeList from "src/components/pokeList";
import SearchBar from "src/components/searchbar";
import SearchResult from "src/components/searchResult";
import Layout from "src/containers/layout";

import { PokemonListStore, PokemonLoadingState, PokemonSearchStore } from "src/stores/pokemon";
import { paresPokemon } from "src/utils/parser";
import { GET_LIST } from "src/query/getPokemonList";

const useHome = () => {
  const pokeList = useRecoilValue(PokemonListStore);
  const loading = useRecoilValue(PokemonLoadingState);
  const setPokeList = useSetRecoilState(PokemonListStore);
  const setLoading = useSetRecoilState(PokemonLoadingState);

  const [refetch] = useLazyQuery(GET_LIST, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted(response) {
      const pokemons = response?.pokemon_v2_pokemon?.map((poke: any) => {
        return paresPokemon(poke);
      });
      setPokeList((prev: Pokemon[]) => (prev).concat(...pokemons));
      setLoading("finish");
    },
    onError(error) {
      setLoading("finish");
    }
  });

  useLayoutEffect(() => {
    if (pokeList?.length === 0) refetch({ variables: { offset: 0 }});
  }, []);

  useEffect(() => { // 로딩 상태가 load일 경우 다음 offest 목록 조회
    if (loading === "load") {
      const offset = pokeList.length;
      refetch({ variables: { offset }});
    }
  }, [pokeList, loading]);
};

const Home = () => {
  const pokeList = useRecoilValue(PokemonListStore);
  const searchValue = useRecoilValue(PokemonSearchStore);
  useHome();

  const hasSearchStr = useMemo(() => {
    return searchValue?.trim()?.length > 0 && !isNaN(Number(searchValue?.trim()));
  }, [searchValue])

  return (<Layout>
    <PokeListCounter count={pokeList?.length} />
    <SearchBar />

    {/* 검색 */}
    {hasSearchStr
      ? <SearchResult />
      : <PokeList withLoader list={pokeList} />
    }
  </Layout>);
};

export default Home;
