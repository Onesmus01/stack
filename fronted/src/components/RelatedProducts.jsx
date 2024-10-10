import React, { useContext, useState, useEffect } from 'react';
import ProductItem from '../components/ProductItem';
import Tittle from '../components/Tittle'; // Corrected typo from Tittle to Title
import { ShopContext } from '../context/ShopContext'; // Ensure the import is correct

const RelatedProducts = ({ category, subCategory }) => { // Added props for category and subCategory
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const productsCopy = products.filter(item => 
                item.category === category && item.subCategory === subCategory
            );
            setRelated(productsCopy.slice(0, 5));
        }
    }, [products, category, subCategory]); // Added category and subCategory to dependencies

    return (
        <div className='my-24'>
            <div className="text-center text-3xl py-2">
                <Tittle text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            {related.length > 0 ? ( // Conditional rendering if related products exist
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {related.map(item => ( // Removed index as key
                        <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
                    ))}
                </div>
            ) : (
                <p>No related products found.</p> // Message for no related products
            )}
        </div>
    );
};

export default RelatedProducts;
