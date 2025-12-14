// SPDX-License-Identifier: MIT
modifier productExists(uint256 id) {
require(products[id].exists, "product not found");
_;
}


constructor() {
owner = msg.sender;
nextProductId = 1;
roles[owner] = Role.Retailer;
}


function assignRole(address account, Role r) external onlyOwner {
roles[account] = r;
emit RoleAssigned(account, r);
}


function createProduct(string calldata lotNumber, string calldata ipfsHash)
external onlyRole(Role.Farmer) returns (uint256)
{
uint256 id = nextProductId++;
Product storage p = products[id];
p.productId = id;
p.lotNumber = lotNumber;
p.createdBy = msg.sender;
p.createdAt = block.timestamp;
p.ipfsHash = ipfsHash;
p.exists = true;


p.checkpoints.push(Checkpoint(block.timestamp, msg.sender, Role.Farmer, "Created", ipfsHash));


emit ProductCreated(id, lotNumber, msg.sender, ipfsHash);
return id;
}


function addCheckpoint(uint256 productId, Role roleOfActor, string calldata note, string calldata ipfsHash)
external productExists(productId)
{
require(roles[msg.sender] == roleOfActor, "caller role mismatch");


products[productId].checkpoints.push(Checkpoint(block.timestamp, msg.sender, roleOfActor, note, ipfsHash));


uint256 idx = products[productId].checkpoints.length - 1;
emit CheckpointAdded(productId, idx, msg.sender, roleOfActor, ipfsHash, note);
}


function getProduct(uint256 productId) external view productExists(productId)
returns (
uint256 id,
string memory lotNumber,
address createdBy,
uint256 createdAt,
string memory ipfsHash,
uint256 checkpointsCount
)
{
Product storage p = products[productId];
return (p.productId, p.lotNumber, p.createdBy, p.createdAt, p.ipfsHash, p.checkpoints.length);
}


function getCheckpoint(uint256 productId, uint256 idx) external view productExists(productId)
returns (uint256, address, Role, string memory, string memory)
{
Checkpoint storage c = products[productId].checkpoints[idx];
return (c.timestamp, c.actor, c.role, c.note, c.ipfsHash);
}
}
