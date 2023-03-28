import React, { useLayoutEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import PokeList from "src/components/pokeList";
import PokeListCounter from "src/components/pokeListCounter";
import Layout from "src/containers/layout";
import { getPokeList } from "src/utils/request";
import { PokemonListState, PokemonLoadingState, PokemonPageState } from "src/stores/pokeList";

const Home = () => {
  const page = useRecoilValue(PokemonPageState);
  const pokeList = useRecoilValue(PokemonListState);
  const setPokeList = useSetRecoilState(PokemonListState);
  const setLoading = useSetRecoilState(PokemonLoadingState);

  useLayoutEffect(() => {
    (async () => {
      setLoading(true);
      const list: Pokemon[] = await getPokeList(page);
      setPokeList((prev: Pokemon[]) => ((prev as any).concat(...list)));
      setLoading(false);
    })();
  }, [page]);
  return (<Layout>
    <PokeListCounter count={pokeList.length} />
    <PokeList withLoader list={pokeList} />
  </Layout>);
};

export default Home;
