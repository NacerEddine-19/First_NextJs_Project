'use client'
import Image from "next/image";
import Products from "../../../(main)/products.js";
import { useState } from "react";
export default function ProductsManager() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState("");
    const [categorie, setcategorie] = useState('categorie');
    const [image, setImage] = useState("blankImage.png");

    function reset() {
        setTitle("");
        setPrice("");
        setDescription("");
        setcategorie('categorie');
        setImage('blankImage.png');
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("categorie", categorie);
        formData.append("image", image);

        fetch("http://localhost/next/admin_manager.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const product = data.product;
                    alert(
                        `Product added successfully!\nTitle: ${product.title}\nPrice: ${product.price}\nDescription: ${product.description}\ncategorie: ${product.categorie}\nimage: ${product.image}`
                    );
                    reset();
                } else {
                    alert("Error adding product!");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Error adding product!");
            });
    };
    const deleteProduct = (id) => {

        fetch(`http://localhost/next/admin_manager.php`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(`Product with ID ${id} deleted successfully!`);
                } else {
                    alert(`Error deleting product with ID ${id}!`);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(`Error deleting product with ID ${id}!`);
            });
    }
    return (
        <>
            <h1 className="title">AJOUTER UN PRODUIT</h1>
            <div className="admin-prod">
                <section className="add-products">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <h3>AJOUTER UN PRODUIT</h3>
                        <input
                            type="text"
                            name="title"
                            className="box"
                            placeholder="entrez le nom du produit"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            min="0"
                            name="price"
                            className="box"
                            placeholder="entrez le prix du produit"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <input
                            type="file"
                            name="image"
                            className="box"
                            filename={image}
                            onChange={(e) => setImage(e.target.files[0].name)}
                            required
                        />
                        <textarea
                            name="description"
                            className="desc"
                            placeholder="enter une description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                        <div className="select">
                            <select
                                defaultValue={categorie}
                                name="categorie"
                                className="cat"
                                onChange={(e) => setcategorie(e.target.value)}
                                required
                            >
                                <option value={'categorie'} disabled>
                                    Choisir a categorie
                                </option>
                                <option value="tshirt">tshirt</option>
                                <option value="shoe">shoe</option>
                                <option value="botle">botle</option>
                            </select>
                        </div>
                        <input type="submit" value="Ajouter un Produit" name="add_product" className="btn" />
                    </form>
                </section>
                <div className="product">
                    <div className="price">{price ? price : 0}</div>
                    <Image src={`/photos/${image}`} alt={title} height={276} width={220} />
                    <p>{title ? title : "Product Name"}</p>
                    <p>{description ? description : "Product description"}</p>
                </div>
            </div>
            <Products handleDelete={deleteProduct} />
        </>
    )
}