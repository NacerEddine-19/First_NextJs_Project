'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function SignUp() {
    const router = useRouter();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPwd, setConfirmedPwd] = useState('')
    const [isConfirmedPwd, setisConfirmedPwd] = useState(false)
    const [isEmpty, setisEmpty] = useState(true)
    const [isPwdTouched, setIsPwdTouched] = useState(false);
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [pwdIsConfirmed, setPwdIsConfirmed] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [nameIsValid, setNameIsValid] = useState(false);
    const [pwdIsValid, setPwdIsValid] = useState(false);

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
            return null;
        }
    }, [password, confirmedPwd])

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmedPwdChange = (e) => {
        setConfirmedPwd(e.target.value);
        setIsPwdTouched(true);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsEmailTouched(true);
    };
    useEffect(() => {
        if (isConfirmedPwd && !isEmpty) {
            setPwdIsConfirmed(true);
        } else {
            setPwdIsConfirmed(false);
        }
    }, [isConfirmedPwd, isEmpty]);

    const validateEmail = () => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    }
    const validateName = () => {
        const regex = /^[a-zA-Z]{4,}$/;
        return regex.test(name);
    }
    const validatePwd = () => {
        const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
        return regex.test(password);
    }
    useEffect(() => {
        setEmailIsValid(validateEmail())
        return () => {
            return 0;
        };
    }, [email]);
    useEffect(() => {
        setNameIsValid(validateName())
        return () => {
            return 0;
        };
    }, [name]);
    useEffect(() => {
        setPwdIsValid(validatePwd())
        return () => {
            return 0;
        };
    }, [password]);
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
                <input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="entrez votre nom"
                    required
                    className={`box ${nameIsValid ? 'green' : ''}`}
                />
                <input
                    type="email"
                    name="email"
                    onChange={(e) => { handleEmailChange(e) }}
                    placeholder="entrer votre Email"
                    required
                    className={`box ${emailIsValid && email !== '' ? 'green' : isEmailTouched ? "red" : ""}`}
                />
                <input
                    type="password"
                    name="password"
                    onChange={handlePasswordChange}
                    placeholder="tapez votre mot de passe"
                    required
                    className={`box ${pwdIsValid && password !== '' ? 'green' : ''}`}
                />
                <input
                    type="password"
                    name="cpassword"
                    onChange={(e) => {
                        handleConfirmedPwdChange(e);
                        setisConfirmedPwd(e.target.value === password);
                    }}
                    placeholder="confirmer votre mot de passe"
                    required
                    className={`box ${isPwdTouched && isConfirmedPwd ? "green" : isPwdTouched ? "red" : ""}`}
                />
                <input
                    type="submit"
                    name="submit"
                    value="S'inscrire"
                    className={`btn ${!nameIsValid || !pwdIsValid || !emailIsValid || !pwdIsConfirmed ? 'disabled' : ''}`}
                    disabled={!nameIsValid || !pwdIsValid || !emailIsValid || !pwdIsConfirmed}
                />
                <p>Vous avez déjà un compte? </p>
                <Link href="/login" className="link-a">Connecte-vous</Link>
            </form>

        </div>
    )
}