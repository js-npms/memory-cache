const MemoryCache = require('../dist/memory-cache')
const { expect } = require('chai')

function wait (sec) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, sec * 1000)
  })
}

describe('MemoryCache test', function() {
  it('cache data', async function() {
    const randomResult1 = await MemoryCache.fetchAsync(`randomMemoryCache`, 3, async () => {
      return Math.random()
    })
    await wait(1)
    const randomResult2 = await MemoryCache.fetchAsync(`randomMemoryCache`, 3, async () => {
      return Math.random()
    })
    expect(randomResult2 === randomResult1).to.equal(true)
    await wait(3)
    const randomResult3 = await MemoryCache.fetchAsync(`randomMemoryCache`, 3, async () => {
      return Math.random()
    })
    expect(randomResult3 !== randomResult1).to.be.equal(true)
  })
})
