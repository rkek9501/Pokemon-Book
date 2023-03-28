/**
 * TODO: Deprecated 됨 추후 제거 예정
 */

const CacheName = 'pokemon';

/**
 * Cache api 활용한 fetch 캐시 처리
 * Cache api: https://developer.mozilla.org/en-US/docs/Web/API/Cache
 * @param url 
 * @returns 
 */
const cachingRequest = async (url: string) => {
  try {
    return await caches.open(CacheName).then(async cache => {
      // 캐시 조회
      const cached = await cache.match(url).then(res => {
        if (!res?.ok) {
          // throw Error("Cannot Find Cached Data!");
          return null;
        }
        const json = res?.json();
        return json;
      });

      // 존재하는 캐시있으면 리턴
      if (cached) return cached;

      // 캐시 없으면 fetch
      const res = await fetch(url).then(res => {
        if (!res?.ok) {
          console.log("error!!", {res})
          // throw Error("Cannot Find Cached Data!");
          return null;
        }
        cache.put(url, res);
        return res.json();
      });
      return res;
    });
  } catch (error) {
    return null;
  }
};

export default cachingRequest;
