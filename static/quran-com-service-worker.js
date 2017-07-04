'use strict';

function setOfCachedUrls(e) {
  return e
    .keys()
    .then(e => e.map(e => e.url))
    .then(e => new Set(e));
}
let precacheConfig = [],
  cacheName =
    `sw-precache-v3-quran-com-frontend-${
    self.registration ? self.registration.scope : ''}`,
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function (e, t) {
    const n = new URL(e);
    return n.pathname.slice(-1) === '/' && (n.pathname += t), n.toString();
  },
  cleanResponse = function (e) {
    return e.redirected
      ? ('body' in e ? Promise.resolve(e.body) : e.blob()).then(t => new Response(t, {
        headers: e.headers,
        status: e.status,
        statusText: e.statusText
      }))
      : Promise.resolve(e);
  },
  createCacheKey = function (e, t, n, r) {
    const o = new URL(e);
    return (r && o.pathname.match(r)) ||
      (o.search +=
        `${(o.search ? '&' : '') +
        encodeURIComponent(t)
        }=${
        encodeURIComponent(n)}`), o.toString();
  },
  isPathWhitelisted = function (e, t) {
    if (e.length === 0) return !0;
    const n = new URL(t).pathname;
    return e.some(e => n.match(e));
  },
  stripIgnoredUrlParameters = function (e, t) {
    const n = new URL(e);
    return (n.hash = ''), (n.search = n.search
      .slice(1)
      .split('&')
      .map(e => e.split('='))
      .filter(e => t.every(t => !t.test(e[0])))
      .map(e => e.join('='))
      .join('&')), n.toString();
  },
  hashParamName = '_sw-precache',
  urlsToCacheKeys = new Map(
    precacheConfig.map((e) => {
      let t = e[0],
        n = e[1],
        r = new URL(t, self.location),
        o = createCacheKey(r, hashParamName, n, /\.\w{8}\./);
      return [r.toString(), o];
    })
  );
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(e => setOfCachedUrls(e).then(t => Promise.all(
            Array.from(urlsToCacheKeys.values()).map((n) => {
              if (!t.has(n)) {
                const r = new Request(n, { credentials: 'same-origin' });
                return fetch(r).then((t) => {
                  if (!t.ok) {
                    throw new Error(
                      `Request for ${
                        n
                        } returned a response with status ${
                        t.status}`
                    );
                  }
                  return cleanResponse(t).then(t => e.put(n, t));
                });
              }
            })
          )))
      .then(() => self.skipWaiting())
  );
}), self.addEventListener('activate', (e) => {
  const t = new Set(urlsToCacheKeys.values());
  e.waitUntil(
    caches
      .open(cacheName)
      .then(e => e.keys().then(n => Promise.all(
            n.map((n) => {
              if (!t.has(n.url)) return e.delete(n);
            })
          )))
      .then(() => self.clients.claim())
  );
}), self.addEventListener('fetch', (e) => {
  if (e.request.method === 'GET') {
    let t,
      n = stripIgnoredUrlParameters(e.request.url, ignoreUrlParametersMatching);
    (t = urlsToCacheKeys.has(n)) ||
      ((n = addDirectoryIndex(n, '/')), (t = urlsToCacheKeys.has(n)));
    !t &&
      e.request.mode === 'navigate' &&
      isPathWhitelisted(['^(?!\\/__).*'], e.request.url) &&
      (
        (n = new URL('../dist/index.html', self.location).toString()),
        (t = urlsToCacheKeys.has(n))
      ), t &&
      e.respondWith(
        caches
          .open(cacheName)
          .then(e => e.match(urlsToCacheKeys.get(n)).then((e) => {
            if (e) return e;
            throw Error('The cached response that was expected is missing.');
          }))
          .catch(t => console.warn(
              'Couldn\'t serve response for "%s" from cache: %O',
              e.request.url,
              t
            ), fetch(e.request))
      );
  }
}), (function (e) {
  if (typeof exports === 'object' && typeof module !== 'undefined') { module.exports = e(); } else if (typeof define === 'function' && define.amd) define([], e);
  else {
    (typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined' ? self : this).toolbox = e();
  }
}(() => (function e(t, n, r) {
  function o(a, s) {
    if (!n[a]) {
      if (!t[a]) {
        const c = typeof require === 'function' && require;
        if (!s && c) return c(a, !0);
        if (i) return i(a, !0);
        const u = new Error(`Cannot find module '${a}'`);
        throw ((u.code = 'MODULE_NOT_FOUND'), u);
      }
      const h = (n[a] = { exports: {} });
      t[a][0].call(
          h.exports,
          (e) => {
            const n = t[a][1][e];
            return o(n || e);
          },
          h,
          h.exports,
          e,
          t,
          n,
          r
        );
    }
    return n[a].exports;
  }
  for (
      var i = typeof require === 'function' && require, a = 0;
      a < r.length;
      a++
    ) {
    o(r[a]);
  }
  return o;
}(
  {
    1: [
      function (e, t, n) {
        function r(e, t) {
          ((t = t || {}).debug || u.debug) &&
              console.log(`[sw-toolbox] ${e}`);
        }
        function o(e) {
          let t;
          return e && e.cache && (t = e.cache.name), (t =
              t || u.cache.name), caches.open(t);
        }
        function i(e, t, n) {
          const r = a.bind(null, e, t, n);
          c = c ? c.then(r) : r();
        }
        function a(e, t, n) {
          let o = e.url,
            i = n.maxAgeSeconds,
            a = n.maxEntries,
            s = n.name,
            c = Date.now();
          return r(
              `Updating LRU order for ${
                o
                }. Max entries is ${
                a
                }, max age is ${
                i}`
            ), h
              .getDb(s)
              .then(e => h.setTimestampForUrl(e, o, c))
              .then(e => h.expireEntries(e, a, i, c))
              .then((e) => {
                r('Successfully updated IDB.');
                const n = e.map(e => t.delete(e));
                return Promise.all(n).then(() => {
                  r('Done with cache cleanup.');
                });
              })
              .catch((e) => {
                r(e);
              });
        }
        function s(e) {
          let t = Array.isArray(e);
          if (
              (
                t &&
                  e.forEach((e) => {
                    typeof e === 'string' || e instanceof Request || (t = !1);
                  }),
                !t
              )
            ) {
            throw new TypeError(
                'The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.'
              );
          }
          return e;
        }
        let c,
          u = e('./options'),
          h = e('./idb-cache-expiration');
        t.exports = {
          debug: r,
          fetchAndCache(e, t) {
            const n = (t = t || {}).successResponses || u.successResponses;
            return fetch(e.clone()).then(r => e.method === 'GET' &&
                  n.test(r.status) &&
                  o(t).then((n) => {
                    n.put(e, r).then(() => {
                      const r = t.cache || u.cache;
                      (r.maxEntries || r.maxAgeSeconds) && r.name && i(e, n, r);
                    });
                  }), r.clone());
          },
          openCache: o,
          renameCache(e, t, n) {
            return r(
                `Renaming cache: [${e}] to [${t}]`,
                n
              ), caches.delete(t).then(() => Promise.all([
                caches.open(e),
                caches.open(t)
              ]).then((t) => {
                let n = t[0],
                  r = t[1];
                return n
                    .keys()
                    .then(e => Promise.all(
                        e.map(e => n.match(e).then(t => r.put(e, t)))
                      ))
                    .then(() => caches.delete(e));
              }));
          },
          cache(e, t) {
            return o(t).then(t => t.add(e));
          },
          uncache(e, t) {
            return o(t).then(t => t.delete(e));
          },
          precache(e) {
            e instanceof Promise ||
                s(e), (u.preCacheItems = u.preCacheItems.concat(e));
          },
          validatePrecacheInput: s,
          isResponseFresh(e, t, n) {
            if (!e) return !1;
            if (t) {
              const r = e.headers.get('date');
              if (r && new Date(r).getTime() + 1e3 * t < n) return !1;
            }
            return !0;
          }
        };
      },
        { './idb-cache-expiration': 2, './options': 4 }
    ],
    2: [
      function (e, t, n) {
        function r(e) {
          return new Promise((t, n) => {
            const r = indexedDB.open(a + e, s);
            (r.onupgradeneeded = function () {
              r.result
                  .createObjectStore(c, { keyPath: u })
                  .createIndex(h, h, { unique: !1 });
            }), (r.onsuccess = function () {
              t(r.result);
            }), (r.onerror = function () {
                n(r.error);
              });
          });
        }
        function o(e, t, n) {
          return t
              ? new Promise((r, o) => {
                let i = 1e3 * t,
                  a = [],
                  s = e.transaction(c, 'readwrite'),
                  f = s.objectStore(c);
                (f.index(h).openCursor().onsuccess = function (e) {
                  const t = e.target.result;
                  if (t && n - i > t.value[h]) {
                    const r = t.value[u];
                    a.push(r), f.delete(r), t.continue();
                  }
                }), (s.oncomplete = function () {
                  r(a);
                }), (s.onabort = o);
              })
              : Promise.resolve([]);
        }
        function i(e, t) {
          return t
              ? new Promise((n, r) => {
                let o = [],
                  i = e.transaction(c, 'readwrite'),
                  a = i.objectStore(c),
                  s = a.index(h),
                  f = s.count();
                (s.count().onsuccess = function () {
                  const e = f.result;
                  e > t &&
                      (s.openCursor().onsuccess = function (n) {
                        const r = n.target.result;
                        if (r) {
                          const i = r.value[u];
                          o.push(i), a.delete(i), e - o.length > t &&
                            r.continue();
                        }
                      });
                }), (i.oncomplete = function () {
                  n(o);
                }), (i.onabort = r);
              })
              : Promise.resolve([]);
        }
        let a = 'sw-toolbox-',
          s = 1,
          c = 'store',
          u = 'url',
          h = 'timestamp',
          f = {};
        t.exports = {
          getDb(e) {
            return e in f || (f[e] = r(e)), f[e];
          },
          setTimestampForUrl(e, t, n) {
            return new Promise((r, o) => {
              const i = e.transaction(c, 'readwrite');
              i
                  .objectStore(c)
                  .put({ url: t, timestamp: n }), (i.oncomplete = function () {
                    r(e);
                  }), (i.onabort = function () {
                    o(i.error);
                  });
            });
          },
          expireEntries(e, t, n, r) {
            return o(e, n, r).then(n => i(e, t).then(e => n.concat(e)));
          }
        };
      },
        {}
    ],
    3: [
      function (e, t, n) {
        function r(e) {
          return e.reduce((e, t) => e.concat(t), []);
        }
        e('serviceworker-cache-polyfill');
        let o = e('./helpers'),
          i = e('./router'),
          a = e('./options');
        t.exports = {
          fetchListener(e) {
            const t = i.match(e.request);
            t
                ? e.respondWith(t(e.request))
                : i.default &&
                  e.request.method === 'GET' &&
                  e.request.url.indexOf('http') === 0 &&
                  e.respondWith(i.default(e.request));
          },
          activateListener(e) {
            o.debug('activate event fired');
            const t = `${a.cache.name}$$$inactive$$$`;
            e.waitUntil(o.renameCache(t, a.cache.name));
          },
          installListener(e) {
            const t = `${a.cache.name}$$$inactive$$$`;
            o.debug('install event fired'), o.debug(
                `creating cache [${t}]`
              ), e.waitUntil(
                o.openCache({ cache: { name: t } }).then(e => Promise.all(a.preCacheItems)
                    .then(r)
                    .then(o.validatePrecacheInput)
                    .then(t => o.debug(
                        `preCache list: ${t.join(', ') || '(none)'}`
                      ), e.addAll(t)))
              );
          }
        };
      },
      {
        './helpers': 1,
        './options': 4,
        './router': 6,
        'serviceworker-cache-polyfill': 16
      }
    ],
    4: [
      function (e, t, n) {
        let r;
        (r = self.registration
            ? self.registration.scope
            : self.scope || new URL('./', self.location).href), (t.exports = {
              cache: {
                name: `$$$toolbox-cache$$$${r}$$$`,
                maxAgeSeconds: null,
                maxEntries: null
              },
              debug: !1,
              networkTimeoutSeconds: null,
              preCacheItems: [],
              successResponses: /^0|([123]\d\d)|(40[14567])|410$/
            });
      },
        {}
    ],
    5: [
      function (e, t, n) {
        let r = new URL('./', self.location).pathname,
          o = e('path-to-regexp'),
          i = function (e, t, n, i) {
            t instanceof RegExp
                ? (this.fullUrlRegExp = t)
                : (
                    t.indexOf('/') !== 0 && (t = r + t),
                    (this.keys = []),
                    (this.regexp = o(t, this.keys))
                  ), (this.method = e), (this.options = i), (this.handler = n);
          };
        (i.prototype.makeHandler = function (e) {
          let t;
          if (this.regexp) {
            const n = this.regexp.exec(e);
            (t = {}), this.keys.forEach((e, r) => {
              t[e.name] = n[r + 1];
            });
          }
          return function (e) {
            return this.handler(e, t, this.options);
          }.bind(this);
        }), (t.exports = i);
      },
        { 'path-to-regexp': 15 }
    ],
    6: [
      function (e, t, n) {
        function r(e) {
          return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }
        let o = e('./route'),
          i = e('./helpers'),
          a = function (e, t) {
            for (var n = e.entries(), r = n.next(), o = []; !r.done;) {
              new RegExp(r.value[0]).test(t) &&
                  o.push(r.value[1]), (r = n.next());
            }
            return o;
          },
          s = function () {
            (this.routes = new Map()), this.routes.set(
                RegExp,
                new Map()
              ), (this.default = null);
          };
        ['get', 'post', 'put', 'delete', 'head', 'any'].forEach((e) => {
          s.prototype[e] = function (t, n, r) {
            return this.add(e, t, n, r);
          };
        }), (s.prototype.add = function (e, t, n, a) {
          a = a || {};
          let s;
          t instanceof RegExp
              ? (s = RegExp)
              : (
                  (s = a.origin || self.location.origin),
                  (s = s instanceof RegExp ? s.source : r(s))
                ), (e = e.toLowerCase());
          const c = new o(e, t, n, a);
          this.routes.has(s) || this.routes.set(s, new Map());
          const u = this.routes.get(s);
          u.has(e) || u.set(e, new Map());
          let h = u.get(e),
            f = c.regexp || c.fullUrlRegExp;
          h.has(f.source) &&
              i.debug(
                `"${t}" resolves to same regex as existing route.`
              ), h.set(f.source, c);
        }), (s.prototype.matchMethod = function (e, t) {
          let n = new URL(t),
            r = n.origin,
            o = n.pathname;
          return (
              this._match(e, a(this.routes, r), o) ||
              this._match(e, [this.routes.get(RegExp)], t)
          );
        }), (s.prototype._match = function (e, t, n) {
          if (t.length === 0) return null;
          for (let r = 0; r < t.length; r++) {
              let o = t[r],
                i = o && o.get(e.toLowerCase());
              if (i) {
                const s = a(i, n);
                if (s.length > 0) return s[0].makeHandler(n);
              }
            }
          return null;
        }), (s.prototype.match = function (e) {
            return (
              this.matchMethod(e.method, e.url) ||
              this.matchMethod('any', e.url)
            );
          }), (t.exports = new s());
      },
        { './helpers': 1, './route': 5 }
    ],
    7: [
      function (e, t, n) {
        let r = e('../options'),
          o = e('../helpers');
        t.exports = function (e, t, n) {
          return (n = n || {}), o.debug(
              `Strategy: cache first [${e.url}]`,
              n
            ), o.openCache(n).then(t => t.match(e).then((t) => {
              let i = n.cache || r.cache,
                a = Date.now();
              return o.isResponseFresh(t, i.maxAgeSeconds, a)
                  ? t
                  : o.fetchAndCache(e, n);
            }));
        };
      },
        { '../helpers': 1, '../options': 4 }
    ],
    8: [
      function (e, t, n) {
        let r = e('../options'),
          o = e('../helpers');
        t.exports = function (e, t, n) {
          return (n = n || {}), o.debug(
              `Strategy: cache only [${e.url}]`,
              n
            ), o.openCache(n).then(t => t.match(e).then((e) => {
              let t = n.cache || r.cache,
                i = Date.now();
              if (o.isResponseFresh(e, t.maxAgeSeconds, i)) return e;
            }));
        };
      },
        { '../helpers': 1, '../options': 4 }
    ],
    9: [
      function (e, t, n) {
        let r = e('../helpers'),
          o = e('./cacheOnly');
        t.exports = function (e, t, n) {
          return r.debug(
              `Strategy: fastest [${e.url}]`,
              n
            ), new Promise((i, a) => {
              let s = !1,
                c = [],
                u = function (e) {
                  c.push(e.toString()), s
                    ? a(
                        new Error(
                          `Both cache and network failed: "${
                            c.join('", "')
                            }"`
                        )
                      )
                    : (s = !0);
                },
                h = function (e) {
                  e instanceof Response ? i(e) : u('No result returned');
                };
              r.fetchAndCache(e.clone(), n).then(h, u), o(e, t, n).then(h, u);
            });
        };
      },
        { '../helpers': 1, './cacheOnly': 8 }
    ],
    10: [
      function (e, t, n) {
        t.exports = {
          networkOnly: e('./networkOnly'),
          networkFirst: e('./networkFirst'),
          cacheOnly: e('./cacheOnly'),
          cacheFirst: e('./cacheFirst'),
          fastest: e('./fastest')
        };
      },
      {
        './cacheFirst': 7,
        './cacheOnly': 8,
        './fastest': 9,
        './networkFirst': 11,
        './networkOnly': 12
      }
    ],
    11: [
      function (e, t, n) {
        let r = e('../options'),
          o = e('../helpers');
        t.exports = function (e, t, n) {
          let i = (n = n || {}).successResponses || r.successResponses,
            a = n.networkTimeoutSeconds || r.networkTimeoutSeconds;
          return o.debug(
              `Strategy: network first [${e.url}]`,
              n
            ), o.openCache(n).then((t) => {
              let s,
                c,
                u = [];
              if (a) {
                const h = new Promise((i) => {
                  s = setTimeout(() => {
                    t.match(e).then((e) => {
                      let t = n.cache || r.cache,
                        a = Date.now(),
                        s = t.maxAgeSeconds;
                      o.isResponseFresh(e, s, a) && i(e);
                    });
                  }, 1e3 * a);
                });
                u.push(h);
              }
              const f = o
                .fetchAndCache(e, n)
                .then((e) => {
                  if ((s && clearTimeout(s), i.test(e.status))) return e;
                  throw (
                    o.debug(`Response was an HTTP error: ${e.statusText}`, n),
                    (c = e),
                    new Error('Bad response')
                  );
                })
                .catch(r => o.debug(
                    `Network or response error, fallback to cache [${
                      e.url
                      }]`,
                    n
                  ), t.match(e).then((e) => {
                    if (e) return e;
                    if (c) return c;
                    throw r;
                  }));
              return u.push(f), Promise.race(u);
            });
        };
      },
        { '../helpers': 1, '../options': 4 }
    ],
    12: [
      function (e, t, n) {
        const r = e('../helpers');
        t.exports = function (e, t, n) {
          return r.debug(`Strategy: network only [${e.url}]`, n), fetch(
              e
            );
        };
      },
        { '../helpers': 1 }
    ],
    13: [
      function (e, t, n) {
        let r = e('./options'),
          o = e('./router'),
          i = e('./helpers'),
          a = e('./strategies'),
          s = e('./listeners');
        i.debug('Service Worker Toolbox is loading'), self.addEventListener(
            'install',
            s.installListener
          ), self.addEventListener(
            'activate',
            s.activateListener
          ), self.addEventListener('fetch', s.fetchListener), (t.exports = {
            networkOnly: a.networkOnly,
            networkFirst: a.networkFirst,
            cacheOnly: a.cacheOnly,
            cacheFirst: a.cacheFirst,
            fastest: a.fastest,
            router: o,
            options: r,
            cache: i.cache,
            uncache: i.uncache,
            precache: i.precache
          });
      },
      {
        './helpers': 1,
        './listeners': 3,
        './options': 4,
        './router': 6,
        './strategies': 10
      }
    ],
    14: [
      function (e, t, n) {
        t.exports =
            Array.isArray ||
            function (e) {
              return Object.prototype.toString.call(e) == '[object Array]';
            };
      },
        {}
    ],
    15: [
      function (e, t, n) {
        function r(e, t) {
          for (
              var n,
                r = [],
                o = 0,
                i = 0,
                a = '',
                u = (t && t.delimiter) || '/';
              (n = v.exec(e)) != null;

            ) {
            let h = n[0],
              f = n[1],
              l = n.index;
            if (((a += e.slice(i, l)), (i = l + h.length), f)) a += f[1];
            else {
              let p = e[i],
                d = n[2],
                m = n[3],
                g = n[4],
                w = n[5],
                x = n[6],
                y = n[7];
              a && (r.push(a), (a = ''));
              let b = d != null && p != null && p !== d,
                R = x === '+' || x === '*',
                E = x === '?' || x === '*',
                C = n[2] || u,
                k = g || w;
              r.push({
                name: m || o++,
                prefix: d || '',
                delimiter: C,
                optional: E,
                repeat: R,
                partial: b,
                asterisk: !!y,
                pattern: k ? c(k) : y ? '.*' : `[^${s(C)}]+?`
              });
            }
          }
          return i < e.length && (a += e.substr(i)), a && r.push(a), r;
        }
        function o(e) {
          return encodeURI(e).replace(/[\/?#]/g, e => `%${e.charCodeAt(0).toString(16).toUpperCase()}`);
        }
        function i(e) {
          return encodeURI(e).replace(/[?#]/g, e => `%${e.charCodeAt(0).toString(16).toUpperCase()}`);
        }
        function a(e) {
          for (var t = new Array(e.length), n = 0; n < e.length; n++) {
            typeof e[n] === 'object' &&
                (t[n] = new RegExp(`^(?:${e[n].pattern})$`));
          }
          return function (n, r) {
            for (
                var a = '',
                  s = n || {},
                  c = (r || {}).pretty ? o : encodeURIComponent,
                  u = 0;
                u < e.length;
                u++
              ) {
              const h = e[u];
              if (typeof h !== 'string') {
                let f,
                    l = s[h.name];
                if (l == null) {
                    if (h.optional) {
                      h.partial && (a += h.prefix);
                      continue;
                    }
                    throw new TypeError(
                      `Expected "${h.name}" to be defined`
                    );
                  }
                if (g(l)) {
                    if (!h.repeat) {
                      throw new TypeError(
                        `Expected "${
                          h.name
                          }" to not repeat, but received \`${
                          JSON.stringify(l)
                          }\``
                      );
                    }
                    if (l.length === 0) {
                      if (h.optional) continue;
                      throw new TypeError(
                        `Expected "${h.name}" to not be empty`
                      );
                    }
                    for (let p = 0; p < l.length; p++) {
                      if (((f = c(l[p])), !t[u].test(f))) {
                        throw new TypeError(
                          `Expected all "${
                            h.name
                            }" to match "${
                            h.pattern
                            }", but received \`${
                            JSON.stringify(f)
                            }\``
                        );
                      }
                      a += (p === 0 ? h.prefix : h.delimiter) + f;
                    }
                  } else {
                    if (((f = h.asterisk ? i(l) : c(l)), !t[u].test(f))) {
                      throw new TypeError(
                        `Expected "${
                          h.name
                          }" to match "${
                          h.pattern
                          }", but received "${
                          f
                          }"`
                      );
                    }
                    a += h.prefix + f;
                  }
              } else a += h;
            }
            return a;
          };
        }
        function s(e) {
          return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
        }
        function c(e) {
          return e.replace(/([=!:$\/()])/g, '\\$1');
        }
        function u(e, t) {
          return (e.keys = t), e;
        }
        function h(e) {
          return e.sensitive ? '' : 'i';
        }
        function f(e, t) {
          const n = e.source.match(/\((?!\?)/g);
          if (n) {
            for (let r = 0; r < n.length; r++) {
              t.push({
                name: r,
                prefix: null,
                delimiter: null,
                optional: !1,
                repeat: !1,
                partial: !1,
                asterisk: !1,
                pattern: null
              });
            }
          }
          return u(e, t);
        }
        function l(e, t, n) {
          for (var r = [], o = 0; o < e.length; o++) {
            r.push(m(e[o], t, n).source);
          }
          return u(new RegExp(`(?:${r.join('|')})`, h(n)), t);
        }
        function p(e, t, n) {
          return d(r(e, n), t, n);
        }
        function d(e, t, n) {
          g(t) || ((n = t || n), (t = []));
          for (
              var r = (n = n || {}).strict, o = !1 !== n.end, i = '', a = 0;
              a < e.length;
              a++
            ) {
            const c = e[a];
            if (typeof c === 'string') i += s(c);
            else {
              let f = s(c.prefix),
                l = `(?:${c.pattern})`;
              t.push(c), c.repeat &&
                  (l += `(?:${f}${l})*`), (i += l = c.optional
                  ? c.partial ? `${f}(${l})?` : `(?:${f}(${l}))?`
                  : `${f}(${l})`);
            }
          }
          let p = s(n.delimiter || '/'),
            d = i.slice(-p.length) === p;
          return r ||
              (i =
                `${d ? i.slice(0, -p.length) : i
                }(?:${
                p
                }(?=$))?`), (i += o ? '$' : r && d ? '' : `(?=${p}|$)`), u(
              new RegExp(`^${i}`, h(n)),
              t
            );
        }
        function m(e, t, n) {
          return g(t) || ((n = t || n), (t = [])), (n = n || {}), e instanceof
            RegExp
              ? f(e, t)
              : g(e) ? l(e, t, n) : p(e, t, n);
        }
        let g = e('isarray');
        (t.exports = m), (t.exports.parse = r), (t.exports.compile = function (
          e,
          t
          ) {
          return a(r(e, t));
        }), (t.exports.tokensToFunction = a), (t.exports.tokensToRegExp = d);
        let v = new RegExp(
            [
              '(\\\\.)',
              '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
            ].join('|'),
            'g'
          );
      },
        { isarray: 14 }
    ],
    16: [
      function (e, t, n) {
        !(function () {
          let e = Cache.prototype.addAll,
            t = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);
          if (t) {
            var n = t[1],
              r = parseInt(t[2]);
          }
          (e &&
              (!t ||
                (n === 'Firefox' && r >= 46) ||
                (n === 'Chrome' && r >= 50))) ||
              (
                (Cache.prototype.addAll = function (e) {
                  function t(e) {
                    (this.name =
                      'NetworkError'), (this.code = 19), (this.message = e);
                  }
                  const n = this;
                  return (t.prototype = Object.create(
                    Error.prototype
                  )), Promise.resolve()
                    .then(function () {
                      if (arguments.length < 1) throw new TypeError();
                      return (e = e.map(e => e instanceof Request ? e : String(e))), Promise.all(
                        e.map((e) => {
                          typeof e === 'string' && (e = new Request(e));
                          const n = new URL(e.url).protocol;
                          if (n !== 'http:' && n !== 'https:') {
                            throw new t('Invalid scheme');
                          }
                          return fetch(e.clone());
                        })
                      );
                    })
                    .then((r) => {
                      if (
                        r.some(e => !e.ok)
                      ) {
                        throw new t('Incorrect response status');
                      }
                      return Promise.all(
                        r.map((t, r) => n.put(e[r], t))
                      );
                    })
                    .then(() => {});
                }),
                (Cache.prototype.add = function (e) {
                  return this.addAll([e]);
                })
              );
        }());
      },
        {}
    ]
  },
    {},
    [13]
  ))(13))), toolbox.router.get(/\${process.env.API_URL}\/(.*)/, toolbox.networkFirst, {
    debug: !0
  });
