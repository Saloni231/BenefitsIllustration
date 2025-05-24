const forge = require("node-forge");

function decryptRSA(encryptedMessage, privateKeyPem) {
  try {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem); // Convert PEM to RSA key
    const decrypted = privateKey.decrypt(forge.util.decode64(encryptedMessage));
    return forge.util.decodeUtf8(decrypted); // Convert back to readable text
  } catch (error) {
    console.error("Decryption Error:", error);
    return null;
  }
}

module.exports = { decryptRSA };
