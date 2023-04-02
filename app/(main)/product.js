'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
export default function Product({ product, deletion, handleDeleteFromCart, handleCountChangeDB }) {
    const [numProd, setNumProd] = useState(handleCountChangeDB ? parseInt(product.quantity) : 1);
    const [user] = useUser();



    function addProd() {
        if (isNaN(numProd)) {
            setNumProd(1);
        }
        setNumProd((prev) => prev + 1);
        { handleCountChangeDB ? handleCountChangeDB() : null };
    }
    function minusProd() {
        setNumProd((prev) => (prev > 1 ? prev - 1 : 1));
        { handleCountChangeDB ? handleCountChangeDB() : null };
    }

    function handleCountChange() {
        if (isNaN(event.target.value)) {
            setNumProd(1);
        }
        else {
            setNumProd(parseInt(event.target.value));
        }
    }

    useEffect(() => {
        const id = product.id;
        fetch(`http://localhost/next/postToCart.php`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, numProd })
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            });
        return () => {
            return 0;
        };
    }, [numProd]);
    function postToCart() {
        if (user){
            const data = {
                idProd: product.id,
                idUser: user.id,
                prodName: product.name,
                prodImage: product.image,
                prodPrice: product.price,
                qty: numProd
            };
            fetch('http://localhost/next/postToCart.php', {
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
        }else{
            alert('Connecter Vous Pour Ajouter au Panier')
        }
    };
    if (handleDeleteFromCart) {
        return (
            <div className='product-cart'>
                <Image src={`/photos/${product.image}`} alt={product.name} height={150} width={150} />

                <div className="prod-info-cart">
                    <h2>{product.price}/DH</h2>
                    <h1>{product.name}</h1>
                    <div className="row-inputs-cart">
                        <div className="minus" onClick={minusProd} >-</div>
                        <input className="count" min="1" type="number" value={numProd} onChange={event => handleCountChange(event)}></input>
                        <div className="add" onClick={addProd}>+</div>
                    </div>
                </div>
                <FontAwesomeIcon style={{ color: "red", cursor: "pointer" }} icon={faXmark} size="2xl" onClick={e => handleDeleteFromCart(product.id)} />
            </div>
        )
    } else {
        return (
            <div className="product">
                <div className="price">{product.price}/DH</div>
                <Link href={`/${product.id}`}>
                    <Image src={`/photos/${product.image}`} alt={product.name} height={276} width={220} />
                </Link>
                <p>{product.name}</p>
                <div className="flex inputs">
                    {deletion ?
                        ""
                        :
                        <div className="row-inputs">
                            <div className="minus" onClick={minusProd} >-</div>
                            <input className="count" min="1" type="number" value={numProd} onChange={event => handleCountChange(event)}></input>
                            <div className="add" onClick={addProd}>+</div>
                        </div>
                    }
                    {
                        deletion ?
                            <button className="btn-Prod delete-btn" vlaue="Suprimer le produit" onClick={() => deletion(product.id)}>Suprimer le produit</button>
                            :
                            <button className="btn-Prod" vlaue="Ajouter au Panier" onClick={postToCart}>Ajouter au Panier</button>
                    }

                </div>
            </div>
        );
    }

}