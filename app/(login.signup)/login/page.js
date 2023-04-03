'use client'
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import useUser from '../../hooks/useUser';
import Link from 'next/link';
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState();
    const [user, setUserAndStore] = useUser(null);

    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }
    function handleChangePwd(event) {
        setPwd(event.target.value)
    }
    function handleSubmit(event) {

        const data = `{"email" :"${email}","pwd" : "${pwd}"}`;
        event.preventDefault();
        fetch('http://localhost/next/conSession.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    let result = response.json();
                    return result;
                } else {
                    console.log('Failed to fetch user from database');
                }
            }).then(res => {
                if (res !== 'undefined' && res[0] !== 'undefined') {
                    const userRes = res[0];
                    setUserAndStore(userRes);
                    console.log(user);
                }

            })
            .catch(error => console.error(error));
    };
    useEffect(() => {
        if (user) {
            const role = user.user_type;
            if (role === "admin") {
                router.push("/adminDashboard");
            } else if (role === "user") {
                router.push("/");
            }
        }
    }, [user]);

    return (
        <div className={styles.formContainer}>
            <form id="form" onSubmit={handleSubmit}>
                <h3>login now</h3>
                <input type="email" value={email} name="email" placeholder="entrer votre Email" required className={styles.box} onChange={handleChangeEmail}></input>
                <input type="password" value={pwd} name="pwd" placeholder="enter votre mot de passe" required className={styles.box} onChange={handleChangePwd}></input>
                <input type="submit" name="submit" value="login" className={styles.btn}></input>
                <p>vous n'avez pas de compte ? <Link href="/signUp">S'inscrire maintenant</Link></p>
            </form>
        </div>
    );

}