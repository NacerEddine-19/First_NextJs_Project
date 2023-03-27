import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const { email, password } = credentials;

                const res = await fetch("https://localhost:3000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                })
                const user = await res.json();
                if (res.ok && user) {
                    return user;
                } else return null;
            }
        })
    ],
    session: {
        strategy: "jwt"
    }
};
export default NextAuth(authOptions)