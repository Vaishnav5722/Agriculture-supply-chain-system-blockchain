import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractInfo from '../../../contractInfo.json';


export default function CreateProduct(){
const [lot, setLot] = useState('');
const [ipfs, setIpfs] = useState('');
const [msg, setMsg] = useState('');


async function create(){
await window.ethereum.request({ method: "eth_requestAccounts"});
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(contractInfo.address, contractInfo.abi, signer);


const tx = await contract.createProduct(lot, ipfs);
await tx.wait();
setMsg("Created: " + tx.hash);
}


return (
<div>
<h3>Create Product</h3>
<input placeholder="Lot" onChange={e=>setLot(e.target.value)} />
<input placeholder="IPFS Hash" onChange={e=>setIpfs(e.target.value)} />
<button onClick={create}>Create</button>
<p>{msg}</p>
</div>
);
}