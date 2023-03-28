import React, { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { PokemonSearchStore } from "src/stores/pokemon";

/**
 * 메인화면 검색창
 * @returns
 */
const SearchBar = () => {
  const [text, setText] = useState("");
  const setValue = useSetRecoilState(PokemonSearchStore);

  useEffect(() => { // 검색 요청 debounce 처리
    const timer = setTimeout(() => {
      setValue(text);
    }, 500);

    return () => clearTimeout(timer);
  }, [text, setValue]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    if (value.length <= 4) setText(value);
  }, [setText]);
  return <input id="search-input" value={text} placeholder="아이디 검색" type="number" onChange={onChange} />;
};

export default SearchBar;
