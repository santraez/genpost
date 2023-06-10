import { Ubuntu_Mono } from "next/font/google"
import { NextAuthProvider } from "@/contexts/NextAuthContext"
import "../globals.sass"

const ubuntu_mono = Ubuntu_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap"
})

export const metadata = {
  title: "GenPost",
  description: "description"
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={ubuntu_mono.className}>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>  
        </body>
      </html>
  )
}
