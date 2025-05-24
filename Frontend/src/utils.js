import forge from "node-forge";

export async function encryptMessage(message, publicKeyStr) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyStr);

  const encryptData = forge.util.encode64(
    publicKey.encrypt(forge.util.encodeUtf8(message))
  );
  return encryptData;
}
