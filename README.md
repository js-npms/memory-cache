### memory-cache

install 

```bash
npm install @js-npms/memory-cache -S
```

```javascript
// es6
import Cache from '@js-npms/memory-cache'
// COMMONJS
const Cache = require('@js-npms/memory-cache')
// UMD / standalone script
const Cache = window.memoryCache
```

usage

```javascript
async function f() {
  // first get from cache. if not, assign callback return data to cache, then return
  await MemoryCache.fetchAsync(`randomMemoryCache`, 3, async () => {
    return Math.random()
  })
}
```

### API

* MemoryCache.fetch(key, expiresIn, blockFn)
* MemoryCache.fetch(key, expiresIn, blockFnAsync)

if you don't want value expired, you can set expiresIn `Infinity`
