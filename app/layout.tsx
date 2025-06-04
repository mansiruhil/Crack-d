import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "crack'd",
  description: "Code. Fix. Go.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
