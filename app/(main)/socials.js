'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faTwitter,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';
import useUser from '../hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function Socials() {
    const [user] = useUser();
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        setShouldRender(true);
    }, [user]);


    return (
        <div className="header flex">
            <div className="social-icons">
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faInstagram} />
            </div>
            {!user && shouldRender ? <div className="sign-up">
                nouvelle
                <Link href={`/login`}>
                    <span className="orange"> connexion</span>
                </Link> | <Link href={`/signUp`}><span className="orange">S'inscrire</span></Link>
            </div> : <div>
                <h1>Welcome <span className="orange">{user?.name}</span>!</h1>
            </div>}

        </div>
    );
}