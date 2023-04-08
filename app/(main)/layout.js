import { SessionProvider } from "next-auth/react";
import Loading from "./loading";
import Socials from './socials';
import Nav from './nav';
import Footer from "./footer";
import { Suspense } from "react";
export default function Layout({
    children,
}) {
    return (
        <section>
            <Suspense fallback={<Loading />}>
                <Socials />
                <Nav />
                {children}
                <Footer />
            </Suspense>
        </section>
    );
}
