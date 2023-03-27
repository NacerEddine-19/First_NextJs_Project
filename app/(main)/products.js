'use client'
import Product from "./product";
import { useEffect, useState } from 'react';
export default function Products({ limit, handleDelete }) {
    const [products, setProducts] = useState();
    const [cat, setCat] = useState("All");
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");



    function handleClickCat(e) {
        setCat(e.target.dataset.value);
        const category = e.target.getAttribute("data-value");
        setSelectedCategory(category);
    }

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost/next/get_prod.php?category=${cat}`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => {
                console.error(error);
            }).finally(() => setLoading(false));
    }, [cat]);
    return (
        <>
            {loading ? <div className="lds-animate"><div></div><div></div><div></div></div> : (<>{!limit && <div className="categories">
                <span className={`cat ${selectedCategory === "All" ? "active" : "notActive"}`} data-value={"All"} onClick={handleClickCat}>All</span>
                <span className={`cat ${selectedCategory === "Shoe" ? "active" : "notActive"}`} data-value={"Shoe"} onClick={handleClickCat}>Shoes</span>
                <span className={`cat ${selectedCategory === "Tshirt" ? "active" : "notActive"}`} data-value={"Tshirt"} onClick={handleClickCat}>T-shirts</span>
                <span className={`cat ${selectedCategory === "Bottle" ? "active" : "notActive"}`} data-value={"Bottle"} onClick={handleClickCat}>Bottles</span>
            </div>}

                <div className="products">
                    {products?.slice(0, limit)?.map((product) => (
                        <Product product={product} key={product.id} handleDelete={handleDelete} />
                    ))}
                </div></>)}

        </>
    );
}