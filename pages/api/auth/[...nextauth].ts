import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    pages: {
        signIn: 'auth/signin',
        signOut: 'auth/signout',
        error: '/api/auth/error', // Error code passed in query string as ?error=
    },
    callbacks: {
        async session({ session }) {
          return session
        },
    }
});