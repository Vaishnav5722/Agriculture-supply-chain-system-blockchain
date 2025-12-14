import React from 'react';
import CreateProduct from './components/CreateProduct';
import ProductView from './components/ProductView';


export default function App(){
return (
<div style={{ padding: 20 }}>
<h1>Agri Supply Chain</h1>
<CreateProduct />
<hr />
<ProductView />
</div>
);
}