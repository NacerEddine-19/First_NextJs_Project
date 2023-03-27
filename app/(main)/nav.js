'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'
import useUser from '../hooks/useUser';
import { useEffect, useState } from 'react';

export default function Nav() {
    const [user, setUser, clearUser] = useUser();
    const [showBox, setShowBox] = useState(false);
    const [ProdCart, setProdCart] = useState()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user !== null) {
            fetch(`http://localhost/next/postToCart.php?id=${user?.id}`)
                .then(response => response.json())
                .then(data => setProdCart(data))
                .catch(error => {
                    console.error(error);
                }).finally(() => setLoading(false));


            return () => {
                return 0;
            }
        }
    }, [user])

    const toggleBox = () => {
        setShowBox(!showBox);
    };


    return (
        <nav className="flex navbar">
            <Link href="/" className="logo"><img src="/photos/ofppt.png" width="180px" /></Link>

            <nav className="nav flex">
                <Link data-active="home" href="/">Accueil</Link>
                <Link data-active="about" href="/about">Apropos</Link>
                <Link data-active="shop" href="/store">Magasin</Link>
                <Link data-active="contact" href="/contact">contact</Link>
                <Link data-active="orders" href="#">Commandes</Link>
            </nav>
            <div className="flex icons">
                <FontAwesomeIcon className='bars fa-icon' icon={faBars} />
                <FontAwesomeIcon className='fa-icon' icon={faSearch} />
                {user && <div className="user-log">

                    <FontAwesomeIcon onClick={toggleBox} className="fa-icon" icon={faUser} />

                    {showBox && <div className="user-box">
                        <p>nom d' utilisateur : <span>{user.name}</span></p>
                        <button className='delete-btn btn' onClick={clearUser}>Logout</button>
                    </div>}
                </div>}
                <div>
                    <Link href={'/cart'}>
                        <FontAwesomeIcon style={{ color: ProdCart && "red" }} className='fa-icon' icon={faShoppingCart} />
                        <span style={{ color: ProdCart && !loading && "red" }}>({!loading && ProdCart?.length})</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}