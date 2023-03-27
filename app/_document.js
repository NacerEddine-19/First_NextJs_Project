import Document, { Html, Head, Main, NextScript } from "next/document"

export default class CostumDoc extends Document{
    render(){
        return(
        <Html>
            <Head>

            </Head>
            <body>
                <Main></Main>
                <NextScript>
                    <script src="costumjs.js"></script>
                </NextScript>
            </body>
        </Html>
            )
    }
}