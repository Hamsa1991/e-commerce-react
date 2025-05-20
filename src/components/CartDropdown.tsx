// CartDropdown.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CartDropdownProps {
    cart: Array<{ id: string; title: string; price: number; quantity: number }>;
    totalPrice: number;
    onCartClick: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ cart, totalPrice, onCartClick }) => {
    return (
        <ul className="dropdown-menu">
            {cart.length === 0 ? (
                <li><span className="dropdown-item">No items in cart</span></li>
            ) : (
                <>
                    <div className="dropdown-header">Cart Items</div>
                    <div className="dropdown-divider"></div>
                    {cart.map((item) => (
                        <li key={item.id} className="dropdown-item">
                            {item.title} - ${item.price.toFixed(2)} - QTY: {item.quantity}
                        </li>
                    ))}
                    <div className="dropdown-item">Total: ${totalPrice.toFixed(2)}</div>
                    <div className="dropdown-item">
                        <Link to="" className="btn btn-link" onClick={onCartClick}>
                            Update Cart
                        </Link>
                    </div>
                </>
            )}
        </ul>
    );
};

export default CartDropdown;
