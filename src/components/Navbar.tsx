// Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Navbar: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    
    const { cart, clearCart } = useCart();

    const handleCartClick = () => {
        setModalOpen(true);
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid d-flex justify-content-center">
                <Link className="navbar-brand" to="/">Shopping</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav d-flex justify-content-center mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Cart ({cart.length})
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {cart.length === 0 ? (
                                    <li><span className="dropdown-item">No items in cart</span></li>
                                ) : (
                                    <>
                                        <div className="dropdown-header">Cart Items</div>
                                        <div className="dropdown-divider"></div>
                                        {cart.map((item, index) => (
                                            <li key={index} className="dropdown-item border-bottom">
                                                {item.title} - ${item.price.toFixed(2)} - QTY: {item.quantity}
                                            </li>
                                        ))}
                                        <div className="dropdown-item"><b>Total: ${totalPrice.toFixed(2)}</b></div>
                                        <div className="dropdown-item text-center">
                                            <button className="btn btn-primary update-cart" onClick={handleCartClick}>
                                                Update Cart
                                            </button>
                                            <button className="btn btn-primary" onClick={clearCart}>
                                                Clear Cart
                                            </button>
                                        </div>
                                    </>
                                )}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {isModalOpen && <Cart onClose={() => setModalOpen(false)} />}
        </nav>
    );
};

export default Navbar;
