import React from 'react';

function Products({ products }) {
  return (
    <div>
      <h2>Our Products</h2>
      <div>
        {products.map((product) => (
          <div key={product.productId}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>In Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;