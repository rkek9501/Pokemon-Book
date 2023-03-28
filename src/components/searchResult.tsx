import React, { useLayoutEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useLazyQuery } from '@apollo/client';

import Pokemon from 'src/components/pokemon';
import { PokemonSearchStore, userPokemonSelector } from 'src/stores/pokemon';
import { paresPokemonSpec } from 'src/utils/parser';
import { GET_POKEMON } from 'src/query/getPokemon';

/**
 * 메인화면 검색 결과
 * @returns
 */
const SearchResult = () => {
  const searchValue = useRecoilValue(PokemonSearchStore);
  const findedPokemon: Pokemon = useRecoilValue(userPokemonSelector);
  const [getPokemon, { loading, data, error }] = useLazyQuery(GET_POKEMON, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network'
  });

  const pokemon = useMemo(() => {
    if (findedPokemon) return findedPokemon;
    if (data?.pokemon_v2_pokemon_by_pk) {
      const poke = paresPokemonSpec(data?.pokemon_v2_pokemon_by_pk);
      return poke;
    }
    return null;
  }, [searchValue, data, findedPokemon]);

  useLayoutEffect(() => {
    if (!findedPokemon) getPokemon({ variables: { id: searchValue } });
  }, [searchValue, findedPokemon]);

  if (loading) return <div className='center'>Loading...</div>;
  if ((error && !findedPokemon) || !pokemon) return <div className='center'>포켓몬 정보가 존재하지 않습니다.</div>;

  return (
    <div className='center'>
      <Pokemon {...pokemon} />
    </div>
  );
};

export default SearchResult;
