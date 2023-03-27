
import Image from "next/image"
import Link from "next/link"
export default function About() {
    return (
        <>
            <div className="heading">
                <h3>Aproros de Nous</h3>
                <p> <Link href="/">Acceuil</Link> / Apropos </p>
            </div>

            <section className="about">

                <div className="flex">

                    <div className="image">
                        <Image src="/photos/about-img1.jpg" alt="banner" height={1200} width={1200} />
                    </div>

                    <div className="content">
                        <h3>Pourquoi de Nous?</h3>
                        <h4>Il y a plusieurs raisons pour lesquelles vous devriez choisir notre site e-commerce pour vos besoins d'achat en ligne :</h4>
                        <ol>
                            <li>Des produits de qualité : Nous proposons une large gamme de produits de haute qualité soigneusement sélectionnés pour répondre à vos besoins.</li>
                            <li>Prix compétitifs : Nous nous efforçons d'offrir nos produits à des prix compétitifs, afin que vous puissiez obtenir le meilleur rapport qualité-prix.</li>
                            <li>Paiement sécurisé et fiable : Nous utilisons des méthodes de paiement sécurisées qui garantissent la sécurité et la fiabilité de vos transactions.</li>
                            <li>Excellent service client : nous avons une équipe de représentants du service client dévoués qui sont toujours prêts à vous aider pour toute question ou préoccupation que vous pourriez avoir.</li>
                            <li>Expédition rapide et fiable : Nous offrons des options d'expédition rapides et fiables pour vous assurer que vous recevez vos produits en temps opportun.</li>

                        </ol>
                        <h4>Dans l'ensemble, nous nous engageons à vous offrir une expérience d'achat positive et à nous assurer que vous êtes entièrement satisfait de votre achat. Alors pourquoi ne pas nous choisir pour votre prochaine expérience d'achat en ligne ?</h4>
                        <Link href="/contact" className="btn">découvrir plus</Link>
                    </div>

                </div>

            </section>
        </>
    )
}