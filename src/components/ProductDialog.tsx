// ProductDialog.tsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CartItem {
    id: number;
    title: string;
    description?: string;
    price: number;
    quantity: number;
    category?: string;
    images?: string[];
}

interface ProductDialogProps {
    product: {
        id: number;
        title: string;
        description: string;
        price: number;
        category: string;
        images: string[];
    } | null;
    onClose: () => void;
}

const ProductDialog: React.FC<ProductDialogProps> = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    if (!product) return null;

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: quantity, 
        };

        addToCart(cartItem, quantity);
        onClose(); // Close dialog after adding to cart
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{product.title}</h5>
                        <div className='ms-auto'><button type="button" className="close-button" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                        </div>
                    </div>
                    <div className="modal-body text-center">
                        <img src={product.images[0]} alt={product.title} className="img-fluid mb-3" width={300} />
                        <p>{product.description}</p>
                        <p className="font-weight-bold">Price: <b>${product.price.toFixed(2)}</b></p>
                        <p>Category: {product.category}</p>
                        <div className="form-group">
                            <label htmlFor="quantity" className="mr-2">Quantity:</label>
                            <input 
                                type="number" 
                                id="quantity" 
                                className="form-control quantity d-inline" 
                                value={quantity} 
                                min="1" 
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </div>
                        <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDialog;
