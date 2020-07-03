/**
 * Keys
 * 
 * All this values SHOULD be on server variable.
 * Dont commit this on main repository.
 */
const USER_KEY = 'user_key@'
const DEID_USER_KEY = 'deid_key@'
/**
 * Initialization vector
 * 
 * Can be randon to improve security
 * and differents results each encrypt.
 * Value can be Buffer.allocUnsafe(16)
 */
const IV = '1nit!v3ctor@rOku'

module.exports = {
  USER_KEY,
  DEID_USER_KEY,
  IV,
}
