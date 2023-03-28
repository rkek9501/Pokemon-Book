import React from 'react';

/**
 * 메인화면 조회된 포켓몬 수
 * @param Props
 * @returns
 */
const PokeListCounter = (Props: { count: number }) => {
  return (
    <div className='length'>
      total:
      <br />
      {Props.count}
    </div>
  );
};

export default PokeListCounter;
