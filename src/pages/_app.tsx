import type { AppProps } from 'next/app'
import {Poppins} from '@next/font/google'
import '@/styles/globals.css'


const poppins = Poppins({subsets: ['latin'], weight: ['400','500','700']})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
  )
}
