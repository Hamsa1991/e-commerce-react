// src/App.tsx
import React from 'react';
import { CartProvider } from './contexts/CartContext';
import AppRouter from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
        <CartProvider>
            <AppRouter />
        </CartProvider>
    );
};

export default App;
