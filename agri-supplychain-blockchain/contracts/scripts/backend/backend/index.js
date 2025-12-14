const express = require('express');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');
const fs = require('fs');
const { create } = require('ipfs-http-client');


const app = express();
app.use(bodyParser.json());


let contractInfo;
try {
contractInfo = JSON.parse(fs.readFileSync('../contractInfo.json'));
} catch {
console.log("Run deploy.js first to generate contractInfo.json");
}


const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const signer = provider.getSigner();


const contract = new ethers.Contract(
contractInfo.address,
contractInfo.abi,
signer
);


const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });


app.post('/api/create-product', async (req, res) => {
try {
const { lotNumber, ipfsHash } = req.body;
const tx = await contract.createProduct(lotNumber, ipfsHash);
await tx.wait();
res.json({ status: 'ok', tx: tx.hash });
} catch (e) {
res.status(500).json({ error: e.toString() });
}
});


app.get('/api/product/:id', async (req, res) => {
try {
const id = Number(req.params.id);
const info = await contract.getProduct(id);
res.json(info);
} catch (e) {
res.status(500).json({ error: e.toString() });
}
});


app.listen(4000, () => console.log("Backend running on port 4000"));