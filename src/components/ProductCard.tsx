import React, { useState } from 'react';
import ProductDialog from './ProductDialog';

interface Product {
    id: number;
    title: string;
    price: number;
    description?: string;
    images: string;
}
interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    
    const openDialog = (product:any) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedProduct(null);
        setDialogOpen(false);
    };

     return (
         <div className="product-card">
            <div  onClick={() => openDialog(product)}>
            <img src={product.images[0]} alt={product.title} />
            <h2>{product.title}</h2>
            <p className="price"><b>${product.price.toFixed(2)}</b></p>
            {product.description && <p className="description">{product.description}</p>}
            </div>
            {isDialogOpen && (
                <ProductDialog product={selectedProduct} onClose={closeDialog} />
            )}
        </div>
    );
}

export default ProductCard;