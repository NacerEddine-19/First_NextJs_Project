'use client'
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
    }, [user, toggleDel, toggleChangeCount])

    useEffect(() => {
        const newProdCart = ProdCart;
        setProdCart(newProdCart)

        return () => {
            return 0;
        }
    }, [toggleDel])

    const deleteAll = () => {
        const userId = user?.id;
        fetch(`http://localhost/next/postToCart.php`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // alert(`Product deleted successfully !`);
                } else {
                    // alert(`Error deleting product !`);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(`Error deleting product with ID ${id}!`);
            }).finally(() => {
                setToggleDel(!toggleDel);
            });
    }


    function handleDeleteFromCart(id) {
        setToggleDel(!toggleDel);
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
                    // alert(`Product deleted successfully !`);
                } else {
                    // alert(`Error deleting product !`);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(`Error deleting product with ID ${id}!`);
            }).finally(() => {
                setProdCart((prevCart) => prevCart.filter((prod) => prod.id !== id));
                setToggleDel(!toggleDel);
            });
    }

    return (<>
        <div className="heading">
            <h3>PANIER</h3>
            <p> <Link href="/">accueil</Link> / panier </p>
        </div>
        {user ? (ProdCart?.length !== 0 ?
            <section className="shopping-cart">

                <h1 className="title">PRODUITS AJOUTÉS</h1>

                <div className="box-container">
                    <div className="products-column">
                        {ProdCart?.map((product) => (
                            <Product
                                product={product}
                                key={product.id}
                                handleDeleteFromCart={handleDeleteFromCart}
                                handleCountChangeDB={handleCountChangeDB} />
                        ))}
                    </div>

                </div>

                <div>
                    <button onClick={deleteAll} className="delete-btn btn">supprimer tout</button>
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
            <p className="empty">Votre panier est vide</p>) : <p className="empty">Connecter vous pour voir votre Panier</p>}

    </>)
}