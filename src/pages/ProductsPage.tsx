import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/products.css';

const ProductsPage = () => {
    const [skip, setSkip] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [filter, setFilter] = useState(''); 

    const limit = 12; // Number of products per page
    const { data, loading, error, totalItems } = useFetch('https://dummyjson.com/products', skip, limit);

    const totalskips = Math.ceil(totalItems / limit); // Calculate total pages
    
    // Handle search and filter logic
    const filteredData = data.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter ? product.category === filter : true; 
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center mb-4">
                <input 
                    type="text" 
                    className="form-control w-25 mr-2 search-products" 
                    placeholder="Search products..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <select className="form-control w-25" onChange={(e) => setFilter(e.target.value)} value={filter}>
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="clothing">Clothing</option>
                    <option value="beauty">Beauty</option>
                    <option value="groceries">Groceries</option>
                    <option value="fragrances">Fragrances</option>
                </select>
            </div>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-danger">Error: {error}</p>}
            <div className="row">
                {filteredData.map(product => (
                    <div className="col-md-3 mb-3" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4 show-buttons">
                <button className="btn btn-outline-primary next-btn" disabled={skip === 1} onClick={() => setSkip(skip - limit)}>
                    Previous
                </button>
                <button className="btn btn-outline-primary" disabled={skip === totalskips} onClick={() => setSkip(skip + limit)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductsPage;
