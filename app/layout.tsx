
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { NavBar } from '@/components/navbar/NavBar2'
import { Footer } from '@/components/footer/footer'
import Head from "next/head";
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Comercio Beta',
  description: 'Integración de Snipcart en Next.js App Router',
}
const BEARER_TOKEN = process.env.NEXT_PUBLIC_SNIPCART_API_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css" />
      </head>
      <body className={inter.className} >
        <Providers>
          <Script src="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js" strategy="beforeInteractive" />
          <div hidden id="snipcart" data-api-key={BEARER_TOKEN} data-config-modal-style="side"  />

          {/** <script src="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js"></script>
          <div hidden id="snipcart" data-api-key={BEARER_TOKEN}></div>*/}

          <header >

            <NavBar></NavBar>
          </header>
          <main className="w-5/6 self-center justify-self-center">

            {children}
          </main>
        </Providers>
        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
}
