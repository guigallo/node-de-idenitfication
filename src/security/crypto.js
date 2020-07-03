const crypto = require('crypto')
const { IV } = require('../config')

const genCipherKey = (key) => {
  if (!key) throw new Error('key cant be null')

  return crypto.createHash("sha256").update(key, "ascii").digest()
}

const encrypt = (stringValue, key, enableLog = false) => {
  if (!stringValue) throw new Error('stringValue cant be null')
  if (typeof stringValue !== 'string') throw new Error('invalid stringValue')

  const KEY = genCipherKey(key)
  const cipher = crypto.createCipheriv('aes-256-cbc', KEY, IV)
  cipher.update(stringValue, 'ascii')
  const encrypted = cipher.final('base64')

  if (enableLog) console.log("Encrypted: %s", encrypted)
  return encrypted
}

const decrypt = (encrypted, key, enableLog = false) => {
  if (!encrypted) throw new Error('encrypted cant be null')
  if (typeof encrypted !== 'string') throw new Error('invalid encrypted')
  if (!key) throw new Error('key cant be null')

  const KEY = genCipherKey(key)
  const decipher = crypto.createDecipheriv("aes-256-cbc", KEY, IV)
  decipher.update(encrypted, "base64")
  const decrypted = decipher.final("ascii")
  if (enableLog) console.log("Decrypted: %s", decrypted)

  return decrypted
}

const defaultTest = () => {
  const key = 'userId'
  const SECRET = '1' // this should be user id
  console.log("Initial: %s", SECRET)
  const crypt = encrypt(SECRET, key, true)
  decrypt(crypt, true)
}

module.exports = {
  encrypt,
  decrypt,
  defaultTest,
}
