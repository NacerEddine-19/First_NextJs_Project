import Link from "next/link";

export default function Contact() {
    return (
        <>
            <div className="heading">
                <h3>contact</h3>
                <p> <Link href="/">home</Link> / contact </p>
            </div>

            <section className="contact">

                <form action="" method="post">
                    <h3>contacter Nous!</h3>
                    <input type="text" name="name" required placeholder="entrer votre nom" className="box" />
                    <input type="email" name="email" required placeholder="entrer votre email" className="box" />
                    <input type="number" name="number" required placeholder="entrer votre tel" className="box" />
                    <textarea name="message" className="box" placeholder="entrer votre message" id="" cols="30" rows="10"></textarea>
                    <input type="submit" value="Envoyer" name="send" className="btn" />
                </form>

            </section>
        </>
    )
}