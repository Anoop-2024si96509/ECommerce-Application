import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import { CartContext } from '../context/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(id);
        setProduct(response.data);
      } catch (err) {
        alert('Failed to load product');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart(product);
      alert(`Added ${quantity} item(s) to cart`);
      setQuantity(1);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!product) return <div className="container"><p>Product not found</p></div>;

  return (
    <div className="container product-detail">
      <button onClick={() => navigate('/dashboard')} className="btn-back">← Back</button>
      
      <div className="detail-content">
        <div className="detail-image">
          <img 
            src={product.image} 
            alt={product.name}
            onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="placeholder">📦</span>'; }}
          />
        </div>
        
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="detail-category">{product.category}</p>
          <p className="detail-description">{product.description}</p>
          
          <div className="detail-specs">
            <div className="spec">
              <span>Price:</span>
              <strong>${product.price.toFixed(2)}</strong>
            </div>
            <div className="spec">
              <span>Stock Available:</span>
              <strong>{product.stock} units</strong>
            </div>
          </div>

          <div className="add-to-cart">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-add-cart"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
