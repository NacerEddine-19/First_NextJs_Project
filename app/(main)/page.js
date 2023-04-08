'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useUser from '../hooks/useUser';
import Hero from './hero'
import Products from './products'


export default function Home() {
  const [user] = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user && user.user_type === 'admin') {
      router.push('../adminDashboard');
    } else {
      router.push('/');
    }
    return () => {
      return 0;
    }
  }, [user])
  return (<>

    <Hero />
    <div className='annonce'>Produits populaires</div>
    <Products limit={9} />
    <section className="home-contact">
      <div className="content">
        <h3>CLIQUEZ ET RÉCUPÉREZ LIVRAISON GRATUITE</h3>
        <Link href="/store" className="white-btn">découvrez Plus</Link>
      </div>
    </section>
  </>
  )
}
