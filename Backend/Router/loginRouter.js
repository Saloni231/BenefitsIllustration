const express = require("express");
const crypto = require("crypto");
const { decryptRSA } = require("../util");

const loginRouter = express.Router();

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

const publicKeyPem = publicKey.export({type: 'pkcs1', format: 'pem'})
const privateKeyPem = privateKey.export({type: 'pkcs1', format: 'pem'})

async function loginUser(req, res) {
  const loginDetails = req.body;
  const decryptedData = decryptRSA(loginDetails[item], privateKeyPem);

  console.log(decryptedData);
}

loginRouter.get("/public-key", (req, res) => {
  res.json({ "publicKey" :publicKeyPem });
});

loginRouter.get("/", loginUser);

module.exports = loginRouter;
