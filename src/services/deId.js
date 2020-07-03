const { DEID_USER_KEY, USER_KEY } = require('../config')
const { encrypt, decrypt } = require('../security/crypto')
const { SensitiveData, Users } = require('../mock/data')

let CRYPT = false
const KEY = 'userId'
const createEncrypt = (cb) => {
  const crypt = encrypt('1', KEY, true)
  CRYPT = crypt

  if (typeof cb === 'function') cb()
}

const createDecrypt = (cb) => {
  if (CRYPT) {
    decrypt(CRYPT, KEY, true)
  } else {
    console.log('Please, crypt first')
  }

  if (typeof cb === 'function') cb()
}

const cryptData = (cb) => {
  const cryptUsers = Users.map((item) => ({
    ...item,
    ['cryptKey **nao vai ter no banco**']: encrypt(`${item.id}`, USER_KEY),
  }))

  const deIdTable = Users.map((user, i) => {
    const userId = encrypt(`${user.id}`, USER_KEY)
    const deId = encrypt(userId, DEID_USER_KEY)

    return { id: 300 + i + 1, userId, deId }
  })

  const secureRegisters = SensitiveData.map((item) => {
    const { id, userId, ...rest } = item

    const deIdRegister = deIdTable.find((i) => {
      const decryptedUserId = decrypt(i.userId, USER_KEY)
      return Number(decryptedUserId) === Number(userId)
    })
    const { id: deId } = deIdRegister

    return {
      id,
      ...rest,
      ['deId (id from deId table)']: deId,
      ['userId **nao vai ter no banco**']: item.userId,
    }
  })

  console.log('\n\nUsuários')
  console.table(cryptUsers)

  console.log('\n\nRegistros seguros')
  console.table(secureRegisters)

  console.log('\n\nDe-id table')
  console.table(deIdTable)

  if (typeof cb === 'function') cb()
}

module.exports = {
  createEncrypt,
  createDecrypt,
  cryptData
}
