async function main() {
const [deployer] = await ethers.getSigners();
console.log("Deploying with", deployer.address);


const Agri = await ethers.getContractFactory("AgriSupply");
const agri = await Agri.deploy();
await agri.deployed();


console.log("AgriSupply deployed to:", agri.address);


const fs = require('fs');
const out = {
address: agri.address,
abi: JSON.parse(agri.interface.format('json'))
};
fs.writeFileSync('contractInfo.json', JSON.stringify(out, null, 2));
}


main().catch((err) => { console.error(err); process.exit(1); });
