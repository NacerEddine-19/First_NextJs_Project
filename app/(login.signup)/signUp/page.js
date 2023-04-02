'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPwd, setConfirmedPwd] = useState('')
    const [isConfirmedPwd, setisConfirmedPwd] = useState(false)
    const [isEmpty, setisEmpty] = useState(true)
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (name === '' || email === '' || password === '' || confirmedPwd === '') {
            setisEmpty(true)
        } else {
            setisEmpty(false)
        }
        return () => {
            return 0;
        };
    }, [name, email, password, confirmedPwd]);

    useEffect(() => {
        setisConfirmedPwd(password === confirmedPwd && password !== '');
        return () => {
            return 0;
        }
    }, [password, confirmedPwd])

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmedPwdChange = (e) => {
        setConfirmedPwd(e.target.value);
        setIsTouched(true);
    };
    useEffect(() => {
        if (isConfirmedPwd && !isEmpty) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [isConfirmedPwd, isEmpty]);


    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        fetch("http://localhost/next/admin_manager.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    router.push('/login');
                } else {
                    alert("Error adding user!");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Error adding user!");
            });
    };
    return (
        <div className="form-container">

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h3>S'inscrire maintenant</h3>
                <input type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="entrez votre nom" required className="box" />
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="entrer votre Email" required className="box" />
                <input type="password" name="password" onChange={handlePasswordChange} placeholder="tapez votre mot de passe" required className={`box ${isConfirmedPwd && password !== '' ? 'green' : ''}`} />
                <input type="password" name="cpassword" onChange={(e) => {
                    handleConfirmedPwdChange(e);
                    setisConfirmedPwd(e.target.value === password);
                }}
                    placeholder="confirmer votre mot de passe"
                    required
                    className={`box ${isTouched && isConfirmedPwd ? "green" : isTouched ? "red" : ""}`} />
                <input type="submit" name="submit" value="S'inscrire maintenant" className={`btn ${!isValid ? 'disabled' : ''}`} />
                <p>Vous avez déjà un compte? <Link href="/login">Connecte-vous maintenant</Link></p>
            </form>

        </div>
    )
}