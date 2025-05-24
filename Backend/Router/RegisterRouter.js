const express = require("express");
const crypto = require("crypto");
const { decryptRSA } = require("../util");
const { copyFile } = require("fs");

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

const registerRouter = express.Router();

const publicKeyPem = publicKey.export({ type: "pkcs1", format: "pem" });
const privateKeyPem = privateKey.export({ type: "pkcs1", format: "pem" });

async function postPolicyDetails(req, res) {
  console.log(req.body)
  const policyDetails = req.body.encryptData;
  const decryptedData = await decryptRSA(policyDetails, privateKeyPem);
  console.log(typeof decryptedData)
}

registerRouter.get("/public-key", (req, res) => {
  res.json({ publicKey: publicKeyPem });
});

registerRouter.post("/", postPolicyDetails);

module.exports = registerRouter;
