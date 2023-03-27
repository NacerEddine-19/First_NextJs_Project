'use client'
import Box from "./box";
import { useState, useEffect } from "react";
export default function Admin() {
    const url = 'http://localhost/next/admin_manager.php';
    const [data, setData] = useState()
    const [data_array, setData_array] = useState([])

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => console.error(error));
    }, [])

    useEffect(() => {
        for (let i = 0; i < data?.length; i++) {
            const element = data[i];
            const elementName = Object.keys(element[0])[0];
            if (typeof element !== "undefined" && element[0]?.price_pending !== null) {
                setData_array((prev) => (
                    [...prev,
                    {
                        id: i,
                        name: `${elementName}`,
                        value: element[0][`${elementName}`]
                    }]))
            }
        }
        return () => {
            return data;
        };
    }, [data]);
    return (
        <section className="dashboard">
            <h1 className="title">TABLEAU DE BORD</h1>
            <div className="box-container">
                {data_array?.map(item => {
                    return <Box key={item.id} data={item} />
                })}
            </div>
        </section>
    )
}