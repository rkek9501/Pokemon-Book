const CacheName = 'pokemon';

if (window) {
  window?.caches.open(CacheName).then(cache => {
    cache.keys().then((urls) => {
      console.log(urls);
    });
    console.log("open cache");
  });
}

const cachingRequest = async (url: string) => {
  return await fetch(url)
    .then((res) => {
      caches.open(CacheName).then(cache => {
        return cache.add(url);
      });
      return res.json();
    });
};

export default cachingRequest;