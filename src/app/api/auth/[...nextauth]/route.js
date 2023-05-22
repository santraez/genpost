import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Admin", email: "admin@admin.com" }
        return user
      }
    })
  ],
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "", // Absolute URL to image
    buttonText: "" // Hex color code
  }
})

export { handler as GET, handler as POST }
