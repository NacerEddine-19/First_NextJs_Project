'use client'
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import useUser from '../../hooks/useUser';
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('nacer@gmail.com');
    const [pwd, setPwd] = useState(123);
    const [user, setUserAndStore] = useUser(null);

    function handleChangeEmail() {
        setEmail(event.target.value)
    }
    function handleChangePwd() {
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
                    console.log(response);
                    console.log(result);
                    return result;
                } else {
                    console.log('Failed to fetch user from database');
                }
            }).then(res => {
                if (res !== 'undefined' && res[0] !== 'undefined') {
                    console.log(res);
                    setUserAndStore(res[0]);
                }

            })
            .catch(error => console.error(error));
    };
    useEffect(() => {
        if (user !== null && user?.user_type === 'admin') {
            router.push('../adminDashboard');
        } else if (user !== null && user?.user_type === 'user') {
            router.push(`/`);
        }
    }, [user]);
    console.log(user);
    return (
        <div className={styles.formContainer}>
            <form id="form" onSubmit={handleSubmit}>
                <h3>login now</h3>
                <input type="email" value={email} name="email" placeholder="entrer votre Email" required className={styles.box} onChange={handleChangeEmail}></input>
                <input type="password" value={pwd} name="pwd" placeholder="enter votre mot de passe" required className={styles.box} onChange={handleChangePwd}></input>
                <input type="submit" name="submit" value="login" className={styles.btn}></input>
                <p>vous n'avez pas de compte ? <a href="#">S'inscrire maintenant</a></p>
            </form>
        </div>
    );

}