// Cart.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CartProps {
    onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
    const { cart, editCartItem, removeFromCart, clearCart } = useCart();

    return (
        <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h5 className="modal-title">Shopping Cart</h5>
                        <div className='ms-auto'>
                            <button type="button" className="close-button" onClick={onClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        {cart.length === 0 ? (
                            <p className="text-center">Cart is empty</p>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="border-bottom mb-3 pb-2">
                                    <h6>{item.title}</h6>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <div className="d-flex align-items-center">
                                        <input 
                                            type="number" 
                                            className="form-control quantity" 
                                            min="1" 
                                            value={item.quantity} 
                                            onChange={(e) => editCartItem(item.id, Number(e.target.value))}
                                        />
                                        <button 
                                            className="btn ml-2" 
                                            onClick={() => removeFromCart(item.id)}>
                                            <FontAwesomeIcon icon={faTrash} className="text-danger" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary clear-cart" onClick={clearCart}>
                            Clear Cart
                        </button>
                        <button className="btn btn-primary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
        </div>
    );
};

export default Cart;
