import { preload } from '../utils/Styles'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <body className='text-white overflow-x-hidden bg-white dark:bg-black w-screen max-w-screen-1xl h-screen'>
        <Main />
        <NextScript />
        <p className={"hidden "+preload}>preload</p>
      </body>
    </Html>
  )
}
