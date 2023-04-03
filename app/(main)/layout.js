import { SessionProvider } from "next-auth/react";
import Loading from "./loading";
import Socials from './socials';
import Nav from './nav';
import Footer from "./footer";
import { Suspense } from "react";
export default function Layout({
    children, // will be a page or nested layout
    // session,
}) {
    return (
        // <SessionProvider>
        <section>
            <Suspense fallback={<Loading />}>
                <Socials />
                <Nav />
                {children}
                <Footer />
            </Suspense>
        </section>
        // </SessionProvider>// session={session}
    );
}
