const bcrypt = require("bcryptjs")
const { sysConfig } = require("../config")

/**
 * 加密密码
 */
function hash(password) {
  var salt = bcrypt.genSaltSync(sysConfig.pwdSaltRound)
  let result = bcrypt.hashSync(password, salt)
  return result
}

/**
 * 验证加密密码
 */
function verify(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
  hash,
  verify
}
