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
    useEffect(() => {
        if (user && user.user_type === 'admin') {
            router.push('../adminDashboard');
        } else if (user && user.user_type === 'user') {
            router.push(`/`);
        } else {
            router.push(`/login`);
        }

    }, [user]);
    const toggleBox = () => {
        setShowBox(!showBox);
    };
    return (
        <nav className="flex navbar">
            <Link href="/" className="logo"><img src="/photos/ofppt.png" width="180px" /></Link>

            <nav className="nav flex">
                <Link data-active="home" href="/adminDashboard">Accueil</Link>
                <Link data-active="products" href="/adminDashboard/products">Produits</Link>
                <Link data-active="command" href="/adminDashboard/commandes">Commandes</Link>
                <Link data-active="users" href="/adminDashboard/users">Utilisateurs</Link>
                {/* <Link data-active="orders" href="#">messages</Link> */}
            </nav>
            <div className="flex icons">
                <FontAwesomeIcon className='bars fa-icon' icon={faBars} />
                <div className="user-log">
                    {user && <FontAwesomeIcon onClick={toggleBox} className="user-btn fa-icon" icon={faUser} />}
                {showBox && <div className="user-box">
                        <p>nom d' utilisateur : <span>{user.name}</span></p>
                        <button className='delete-btn btn' onClick={clearUser}>Logout</button>
                    </div>}
                </div>
            </div>
        </nav>
    );
}