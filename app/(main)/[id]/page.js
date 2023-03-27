'use client'
import { useEffect, useState } from "react";
import Image from 'next/image'

export default function Product({ params }) {
    const [product, setProduct] = useState([]);
    const [numProd, setNumProd] = useState(1);
    function addProd() {
        if (isNaN(numProd)) {
            setNumProd(1);
        }
        setNumProd((prev) => prev + 1);
    }
    function minusProd() {
        setNumProd((prev) => (prev > 1 ? prev - 1 : 1));
    }

    function handleCountChange() {
        if (isNaN(event.target.value)) {
            setNumProd(1);
        }
        else {
            setNumProd(parseInt(event.target.value));
        }
    }

    const { id } = params;

    useEffect(() => {
        fetch(`http://localhost/next/get_prod.php?id=${id}`)
            .then(response => response.json())
            .then(data => setProduct(data[0]))
            .catch(error => {
                console.error(error);
            });
    }, []);

    function postToCart() {
        const id = product.id;
        const data = `{"id" :"${id}"}`;
        fetch('http://localhost/next/get_prod.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log('Data successfully posted to database!');
                } else {
                    console.log('Failed to post data to database');
                }
            })
            .catch(error => console.error(error));
    };
    return (

        <div className="parent">
            <div className="big">
                <Image id="big-img" src={`/photos/${product.image}`} alt={product.name} height={1200} width={1200} />
            </div>
            <div className="info">
                <div className="first">
                    <h1>{product.name}</h1>
                    <h2>{product.price}/DH</h2>
                </div>
                <div className="second">
                    <p>{product.description}</p>
                    <div className="row-inputs">
                        <div className="btn-id">
                            <div className="minus" onClick={minusProd} >-</div>
                            <input className="count" min="1" type="number" value={numProd} onChange={event => handleCountChange(event)}></input>
                            <div className="add" onClick={addProd}>+</div>
                        </div>
                        <button className="btn-Prod" vlaue="Ajouter au Panier" onClick={postToCart}>Ajouter au Panier</button>
                    </div>
                </div>
            </div>
        </div>
    );


} 