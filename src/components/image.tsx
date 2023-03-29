import React, { useLayoutEffect, useState } from 'react';

type ImageState = "loading" | "load" | "error";

const Img = React.memo((Props: any) => {
  const [state, setState] = useState<ImageState>("loading");
  useLayoutEffect(() => {
    const image = new Image();
    image.src = Props.src;
    image.onload = (e) => {
      setState("load");
    }
    image.onerror = (e) => {
      setState("error");
    }
  }, []);

  if (state === "loading") return <div className='imagebox'>Loading...</div>
  if (state === "error") return <div className='imagebox'>이미지를 불러올 수 없습니다.</div>

  return <img {...Props}  />;
});

export default Img;
