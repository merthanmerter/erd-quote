import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    // adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                if (credentials.username === "admin" && credentials.password === "admin") {
                    return {
                        id: 0,
                        name: "Admin",
                    }
                }
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
                // const user = await res.json()
                // if (res.ok && user) {
                //     return user
                // }
                return null
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session: ({ session, token }: any) => {
            if (token) {
                session.id = token.id
                session.user.role = "admin"
            }
            return session
        }
    },
    secret: "test",
    jwt: {
        secret: "test",
    }
})