importScripts('./js/jsencrypt2.js')


// 加密
// publicKey: 后台给的公钥
function encrypt(publicKey, text) {
  let encryptor = new JSEncrypt.JSEncrypt() // 新建JSEncrypt对象
  encryptor.setPublicKey(publicKey) // 设置公钥
  let encrypted = encryptor.encrypt(text) // 对密码进行加密
  return encrypted
}


// 解密-暂时用不到
function decrypt(privateKey, encryptedText) {
  let decrypt = new JSEncrypt.JSEncrypt()
  decrypt.setPrivateKey(privateKey)
  var decrypted = decrypt.decrypt(encryptedText)
  return decrypted
}
