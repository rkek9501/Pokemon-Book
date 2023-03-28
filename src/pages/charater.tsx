import React, { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import Layout from 'src/containers/layout';
import PokeList from 'src/components/pokeList';
import { paresPokemonSpec, parsePathQuery } from 'src/utils/parser';
import { GET_POKEMON_SPEC } from 'src/query/getPokemonSpec';
import Img from 'src/components/image';

const useCharacter = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [{ id, src, name, flavor_text, evolutions }, setSpecs] = useState<any>({ id: 0, src: '', name: '', flavor_text: '', evolutions: [] });
  const [getPokemonById] = useLazyQuery(GET_POKEMON_SPEC, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-only',
    onCompleted(response) {
      if (response?.pokemon_v2_pokemon_by_pk) {
        const { id, name, koName, src, flavor_text, evolutions } = paresPokemonSpec(response?.pokemon_v2_pokemon_by_pk);
        setSpecs({ id, src, name: koName, flavor_text, evolutions });
      } else {
        setError('포켓몬을 찾을 수 없습니다.');
      }
      setLoading(false);
    },
    onError(err) {
      setError('경로가 올바르지 않거나. 포켓몬을 찾을 수 없습니다.');
    }
  });

  useLayoutEffect(() => {
    // 위치 변경시 현재 경로 파싱하여 포켓몬 조회 요청
    setError(null);
    setLoading(true);

    const pokemonId = parsePathQuery('id', location.search);
    getPokemonById({ variables: { id: pokemonId } });
  }, [location]);

  return {
    error,
    loading,
    data: {
      id,
      src,
      name,
      flavor_text,
      evolutions
    }
  };
};

const Character = () => {
  const { error, loading, data } = useCharacter();
  const { id, src, name, flavor_text, evolutions } = data;

  if (error)
    return (
      <div className='center' style={{ padding: 20 }}>
        {error}
      </div>
    );
  if (loading && !src)
    return (
      <div className='center' style={{ padding: 20 }}>
        Loading...
      </div>
    );

  return (
    <Layout>
      <div className='center'>
        <span>
          <Img src={src} alt={name} width={160} height={160} />
          <div>이름 : {name}</div>
          <div>설명 : {flavor_text}</div>
        </span>
        <hr />
        <div>진화</div>
        <PokeList list={evolutions || []} />
      </div>
    </Layout>
  );
};

export default Character;
