// cache.js
class CacheItem {
  constructor (props = { expiresIn: 0, value: null }) {
    this.expiresIn = props.expiresIn // 秒
    this.expiresAt = parseInt(new Date().getTime() / 1000) + this.expiresIn
    this.value = props.value
  }
  // 有效的
  get isValid () {
    return parseInt(new Date().getTime() / 1000) < this.expiresAt
  }
}
let shareInstance = null

export default class Cache {
  static get shareInstance () {
    shareInstance = shareInstance || new Cache()
    return shareInstance
  }
  static fetch (key, expiresIn, blockFn) {
    return Cache.shareInstance.fetch(...arguments)
  }
  static fetchAsync (key, expiresIn, blockFnAsync) {
    return Cache.shareInstance.fetchAsync(...arguments)
  }

  constructor () {
    this.cache = {}
  }
  fetch (key, expiresIn, blockFn) {
    const cacheItem = this.cache[key]
    if (!cacheItem || !cacheItem.isValid) {
      const value = blockFn && blockFn() || null
      this.cache[key] = new CacheItem({ expiresIn, value })
    }
    this.tryClearInvalidData()
    return this.cache[key].value
  }
  async fetchAsync (key, expiresIn, blockFnAsync) {
    const cacheItem = this.cache[key]
    if (!cacheItem || !cacheItem.isValid) {
      // 异步获取值捕获异常，将过期时间设置为0(立即过期)
      const value = blockFnAsync && (await blockFnAsync().catch(e => expiresIn = 0)) || null
      this.cache[key] = new CacheItem({ expiresIn, value })
    }
    this.tryClearInvalidData()
    return this.cache[key].value
  }
  // 删除无效数据
  tryClearInvalidData () {
    // 阀值，十分之一可能清理无效缓存
    if (Math.random() > 0.9) {
      setTimeout(() => { // 异步清理
        Object.keys(this.cache).forEach(key => {
          if (!this.cache[key].isValid) {
            delete this.cache[key]
          }
        })
      })
    }
  }
}
