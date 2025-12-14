import React, { useState } from 'react';


export default function ProductView(){
const [id, setId] = useState('');
const [data, setData] = useState(null);


async function fetchProduct(){
const res = await fetch(`/api/product/${id}`);
setData(await res.json());
}


return (
<div>
<h3>View Product</h3>
<input placeholder="Product ID" onChange={e=>setId(e.target.value)} />
<button onClick={fetchProduct}>Fetch</button>
<pre>{JSON.stringify(data, null, 2)}</pre>
</div>
);
}