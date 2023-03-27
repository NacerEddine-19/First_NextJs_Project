import { useState, useEffect } from 'react';

const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = window.localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const setUserAndStore = (user) => {
        window.localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const clearUserAndStore = () => {
        window.localStorage.removeItem('user');
        setUser(null);
    };

    return [user, setUserAndStore, clearUserAndStore];
};

export default useUser;