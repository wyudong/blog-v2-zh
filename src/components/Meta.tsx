import Head from 'next/head'

const Meta = () => {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta
        name="description"
        content={`Made by Next.js + Outstatic.`}
      />
    </Head>
  )
}

export default Meta
