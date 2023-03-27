import { SessionProvider } from "next-auth/react";
import Socials from './socials';
import Nav from './nav';
import Footer from "./footer";
export default function Layout({
    children, // will be a page or nested layout
    // session,
}) {
    return (
        // <SessionProvider>
            <section>
                <Socials />
                <Nav />
                {children}
                <Footer />
            </section>
        // </SessionProvider>// session={session}
    );
}
