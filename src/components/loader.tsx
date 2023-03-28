import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { PokemonLoadingState } from 'src/stores/pokemon';

/**
 * 메인화면 포켓몬 목록 마지막에 들어가는 컴포넌트
 * 해당 컴포넌트가 브라우져 진입 여부에 따라 다음 포켓몬 목록 조회
 * @returns
 */
const Loader = () => {
  const loader = useRef<HTMLSpanElement>(null);
  const loading = useRecoilValue(PokemonLoadingState);
  const setLoading = useSetRecoilState(PokemonLoadingState);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      const handler = setTimeout(() => {
        setLoading((prev) => (prev === 'init' ? 'init' : prev === 'finish' ? 'load' : prev));
      }, 1000);
      return () => clearTimeout(handler);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <span className={`pokemon-block center ${loading === 'finish' && 'none'}`} ref={loader}>
      loading...
    </span>
  );
};

export default Loader;
