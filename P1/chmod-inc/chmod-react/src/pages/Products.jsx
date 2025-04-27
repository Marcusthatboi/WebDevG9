import React, { useState, useEffect } from 'react';
import './products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products...');
        const response = await fetch('http://localhost:3000/api/products');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Products received:', data);
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Networking Products</h1>
        <p>Explore our range of high-performance network hardware solutions</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-spinner">
          <p>Loading products...</p>
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product._id} className="product-card">
                  <h3>{product.name}</h3>
                  <p><strong>Type:</strong> {product.type}</p>
                  <p><strong>Grade:</strong> {product.grade}</p>
                  <p>{product.description}</p>
                  <p className="price">${product.price.toFixed(2)}</p>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-products">No products found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Products;