
const cacheName = 'my_app_cache';
// 在 sw.js 中监听安装完成事件
self.addEventListener('install', function(e) {
  console.log('Service worker installed.');
  // 初始化 Cache Storage
  const cacheOpenPromise = caches.open(cacheName);
  // 安装过程中，等待 Cache Storage 配置完成
  e.waitUntil(cacheOpenPromise);
});

// 监听所有的请求
self.addEventListener('fetch', function(e) {
    const request = e.request;
    // 如果请求的路径不是 js 结尾，就通过 return false 来告诉 
    // service worker 这个请求应该发送到服务器端
    if (!request.url.endsWith('.js')) return false;

    //or similarly, we can handle GET API request
    // Let the browser do its default thing
    // for non-GET requests.
    //if (request.method != 'GET') return;
    
    // 否则检查 cache 中是否有对应的 response
    const promise = caches.open(cacheName).then(cache => {
      // 使用 cache.match 
      return cache.match(request).then(res => {
        if (res) {
          // 如果缓存存在则直接返回结果
          return Promise.resolve(res);
        } else {
          // 否则发出请求，并存到 cache
          const corsRequest = new Request(request.url);
          return fetch(corsRequest).then(res => {
            // 更新 cache
            cache.put(request, res.clone());
            return res;
          })
        }
      });
    });
    // 使用 e.respondWith 方法给请求返回内容
    e.respondWith(promise);
  });