'use client'
import Link from 'next/link';
import Products from '../products';
export default function Store() {
    
    return (
        <>
            <div className="heading">
                <h3>NOUVELLES ARRIVÉES</h3>
                <p> <Link href="/">Acceuil</Link> / Magasin </p>
            </div>
            <Products />
        </>
    )

}

