import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Main page</title>
      </Head>
      <div className="text-primary">
        <Link href="/test">
          <a>Go to TEst Page</a>
        </Link>
      </div>
    </>
  )
}
