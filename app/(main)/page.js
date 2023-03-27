'use client'
import Link from 'next/link';
import Hero from './hero'
import Products from './products'


export default function Home() {

  return (<>
    <Hero />
    <div className='annonce'>derniers produits</div>
    <Products limit={9} />
    <section className="home-contact">
      <div className="content">
        <h3>CLIQUEZ ET RÉCUPÉREZ LIVRAISON GRATUITE</h3>
        <Link href="/contact" className="white-btn">découvrez Maintenant</Link>
      </div>
    </section>
  </>
  )
}
