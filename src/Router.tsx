// src/Router.tsx
import React from 'react'; // Ensure React is imported
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust paths as necessary
import ProductsPage from './pages/ProductsPage';
// import Cart from './components/Cart';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProductsPage />} />
                {/* <Route path="/cart" element={<Cart />} /> */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
