import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAT70FnrZeeyz_YvYqeZ7F5TqMCpIYWLR0&libraries=places" />
      </Head>
      {/* <Head /> */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap" rel="stylesheet"></link>

      {/* Google Maps API */}
      {/* <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAT70FnrZeeyz_YvYqeZ7F5TqMCpIYWLR0&libraries=places" strategy="beforeInteractive"/> */}
      <Header />
      <body className='max-w-[1500px] mx-auto px-8 pt-32'>
        <Main />
        <NextScript />
      </body>
      <Footer />
    </Html>
  )
}
