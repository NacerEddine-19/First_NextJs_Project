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
import { useEffect } from 'react';
export default function Socials() {
    const [user] = useUser();

    const router = useRouter();


    useEffect(() => {
        if (user && user.user_type === 'admin') {
            router.push('../adminDashboard');
        }

        return () => {
            return 0;
        }
    }, [user])





    return (
        <div className="header flex">
            <div className="social-icons">
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faInstagram} />
            </div>
            {user === null ? <div className="sign-up">
                nouvelle
                <Link href={`/login`}>
                    <span className="orange"> connexion</span>
                </Link> | <span className="orange">S'inscrire</span>
            </div> : <div>
                <h1>Welcome <span className="orange">{user?.name}</span>!</h1>
            </div>}

        </div>
    );
}