'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'
import useUser from '../hooks/useUser';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Nav() {
    const [user, setUser, clearUser] = useUser();
    const [showBox, setShowBox] = useState(false);
    const [ProdCart, setProdCart] = useState()
    const [CountProd, setCountProd] = useState()
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const [selectedLink, setselectedLink] = useState(`${pathname.slice(1)}`);

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
    }, [user, loading])

    useEffect(() => {
        const newCount = ProdCart?.length;
        setCountProd(newCount);

        return () => {
            return 0;
        }
    }, [loading])

    function handleClickLink(e) {
        setselectedLink(e.target.dataset.value);
        const link = e.target.getAttribute("data-active");
        setselectedLink(link);
    }

    const handleLogout = () => {
        clearUser();
        window.location.reload(true);
    };

    const toggleBox = () => {
        setShowBox(!showBox);
    };


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    return (
        <nav className="flex navbar">
            <Link href="/" className="logo"><img src="/photos/logo-1.png" width="180px" /></Link>

            <nav className={`nav flex ${menuOpen ? 'show' : 'dShow'}`}>
                <Link className={`${selectedLink === "home" ? "activeLink" : "notActive"}`} data-active="home" data-value={'home'} onClick={handleClickLink} href="/">Accueil</Link>
                <Link className={`${selectedLink === "about" ? "activeLink" : "notActive"}`} data-active="about" data-value={'about'} onClick={handleClickLink} href="/about">Apropos</Link>
                <Link className={`${selectedLink === "shop" ? "activeLink" : "notActive"}`} data-active="shop" data-value={'shop'} onClick={handleClickLink} href="/store">Magasin</Link>
                <Link className={`${selectedLink === "contact" ? "activeLink" : "notActive"}`} data-active="contact" data-value={'contact'} onClick={handleClickLink} href="/contact">contact</Link>
                <Link className={`${selectedLink === "orders" ? "activeLink" : "notActive"}`} data-active="orders" data-value={'orders'} onClick={handleClickLink} href="#">Commandes</Link>
            </nav>
            <div className="flex icons">
                <FontAwesomeIcon onClick={toggleMenu} className='bars fa-icon' icon={faBars} />
                <FontAwesomeIcon className='fa-icon' icon={faSearch} />
                {user && <div className="user-log">

                    <FontAwesomeIcon onClick={toggleBox} className="fa-icon" icon={faUser} />

                    {showBox && <div className="user-box">
                        <p>nom d' utilisateur : <span>{user.name}</span></p>
                        <button className='delete-btn btn' onClick={handleLogout}>Logout</button>
                    </div>}
                </div>}
                <div>
                    <Link href={'/cart'}>
                        <FontAwesomeIcon style={{ color: ProdCart && "red" }} className='fa-icon' icon={faShoppingCart} />
                        <span style={{ color: ProdCart && !loading && "red" }}>({user && (CountProd || 0)})</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}