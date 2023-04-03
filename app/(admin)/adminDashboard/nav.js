'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'
import useUser from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Nav() {
    const router = useRouter();
    const [user, setUser, clearUser] = useUser();
    const [showBox, setShowBox] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedLink, setselectedLink] = useState();
    console.log(user);
    useEffect(() => {
        if (user) {
            if (user?.user_type !== 'admin') {
                router.push('/login')
            } else if (user?.user_type == 'user') {
                router.push('/')
            } else {
                router.push('/adminDashboard')

            }
        } else {
            router.push('/login')
        }
        return () => {
            return 0;
        };
    }, [user]);

    function handleClickLink(e) {
        setselectedLink(e.target.dataset.value);
        const link = e.target.getAttribute("data-active");
        setselectedLink(link);
    }
    const logout = () => {
        router.push('/')
        clearUser()
    }

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
                <Link className={`${selectedLink === "home" ? "activeLink" : "notActive"}`} data-value={'home'} data-active="home" onClick={handleClickLink} href="/adminDashboard">Accueil</Link>
                <Link className={`${selectedLink === "products" ? "activeLink" : "notActive"}`} data-value={'products'} data-active="products" onClick={handleClickLink} href="/adminDashboard/products">Produits</Link>
                <Link className={`${selectedLink === "command" ? "activeLink" : "notActive"}`} data-value={'command'} data-active="command" onClick={handleClickLink} href="/adminDashboard/commandes">Commandes</Link>
                <Link className={`${selectedLink === "users" ? "activeLink" : "notActive"}`} data-value={'users'} data-active="users" onClick={handleClickLink} href="/adminDashboard/users">Utilisateurs</Link>
                <Link className={`${selectedLink === "message" ? "activeLink" : "notActive"}`} data-value={'message'} data-active="message" onClick={handleClickLink} href="/adminDashboard/message">Messages</Link>

            </nav>
            <div className="flex icons">
                <FontAwesomeIcon onClick={toggleMenu} className='bars fa-icon' icon={faBars} />
                <div className="user-log">
                    {user && <FontAwesomeIcon onClick={toggleBox} className="user-btn fa-icon" icon={faUser} />}
                    {showBox && <div className="user-box">
                        <p>nom d' utilisateur : <span>{user?.name}</span></p>
                        <button className='delete-btn btn' onClick={logout}>Logout</button>
                    </div>}
                </div>
            </div>
        </nav>
    );
}

