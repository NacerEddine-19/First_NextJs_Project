'use client'
import { useEffect, useState } from "react";
import Userbox from "./userBox";
export default function Users() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost/next/conSession.php`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => {
                console.error(error);
            }).finally(() => setLoading(false));
    }, []);

    const handleDeleteUser = (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        fetch(`http://localhost/next/conSession.php`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(`USER with ID ${id} deleted successfully!`);
                } else {
                    alert(`Error deleting USER with ID ${id}!`);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(`Error deleting USER with ID ${id}!`);
            });
    };
    return (
        <section className="users">

            <h1 className="title">COMPTES UTILISATEUR </h1>

            <div className="box-container">

                {loading ? (
                    <div className="lds-animate"><div></div><div></div><div></div></div>
                ) : (
                    users.map(user => (
                        <Userbox key={user.id} user={user} onDelete={handleDeleteUser} />
                    ))
                )}




            </div>

        </section>
    )
}