import Document, { Html, Head, Main, NextScript } from "next/document"

export default class CostumDoc extends Document{
    render() {
        return (
            <Html>
                <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="costumjs.js" />
                </body>
            </Html>
        );
    }
}