'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import Product from "../product";

export default function Cart() {
    const [user] = useUser();
    const [ProdCart, setProdCart] = useState()
    const [totalPrice, setTotalPrice] = useState();
    const [toggleDel, setToggleDel] = useState(false);
    const [toggleChangeCount, setToggleChangeCount] = useState(false);

    function handleCountChangeDB() {
        setToggleChangeCount(!toggleChangeCount)
        console.log(toggleChangeCount);
    }

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < ProdCart?.length; i++) {
            total += ProdCart[i].price * ProdCart[i].quantity;
        }
        setTotalPrice(total);

        return () => {
            return 0;
        }
    }, [ProdCart, toggleChangeCount])

    useEffect(() => {
        if (user !== null) {
            fetch(`http://localhost/next/postToCart.php?id=${user?.id}`)
                .then(response => response.json())
                .then(data => setProdCart(data))
                .catch(error => {
                    console.error(error);
                });
        }

        console.log(user);
        console.log(ProdCart);
    }, [user, toggleDel, toggleChangeCount])

    function handleDeleteFromCart(id) {
        setToggleDel(false);
        fetch(`http://localhost/next/postToCart.php`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(`Product with ID ${id} deleted successfully!`);
                } else {
                    alert(`Error deleting product with ID ${id}!`);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(`Error deleting product with ID ${id}!`);
            }).finally(setToggleDel(true));
    }

    return (<>
        <div className="heading">
            <h3>PANIER</h3>
            <p> <Link href="/">accueil</Link> / panier </p>
        </div>
        {user ? (ProdCart ?
            <section className="shopping-cart">

                <h1 className="title">PRODUITS AJOUTÉS</h1>

                <div className="box-container">
                    <div className="products-column">
                        {ProdCart?.map((product) => (
                            <Product product={product} key={product.id} handleDeleteFromCart={handleDeleteFromCart} handleCountChangeDB={handleCountChangeDB} />
                        ))}
                    </div>

                </div>

                <div>
                    <a href="" className="delete-btn btn">supprimer tout</a>
                </div>

                <div className="cart-total">
                    <p>total général : <span>{totalPrice}/- MAD</span></p>
                    <div className="flex">
                        <Link href="/" className="option-btn btn">Continuer vos achats</Link>
                        <Link href="/checkout" className="btn">Passer à la caisse</Link>
                    </div>
                </div>


            </section>
            :
            <p className="empty">Votre panier est vide</p>):<p className="empty">Connecter vous pour voir votre Panier</p>}
        {/* {ProdCart ?
            <section className="shopping-cart">

                <h1 className="title">PRODUITS AJOUTÉS</h1>

                <div className="box-container">
                    <div className="products-column">
                        {ProdCart?.map((product) => (
                            <Product product={product} key={product.id} handleDeleteFromCart={handleDeleteFromCart} handleCountChangeDB={handleCountChangeDB} />
                        ))}
                    </div>

                </div>

                <div>
                    <a href="" className="delete-btn btn">supprimer tout</a>
                </div>

                <div className="cart-total">
                    <p>total général : <span>{totalPrice}/- MAD</span></p>
                    <div className="flex">
                        <Link href="/" className="option-btn btn">Continuer vos achats</Link>
                        <Link href="/checkout" className="btn">Passer à la caisse</Link>
                    </div>
                </div>


            </section>
            :
            <p className="empty">Votre panier est vide</p>
        } */}
    </>)
}