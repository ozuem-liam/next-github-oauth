import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr'


async function fetcher(args: any) {
  const res = await fetch(args)

  return res.json()
}

const Home: NextPage = () => {
  const { data: session } = useSession()
  const { data } = useSWR('/api/github', fetcher)
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!session && (<button className={styles.signin} 
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}>Sign in with GitHub</button>)}
        {session && (
          <>
            <Image alt="profile" src={`${session?.user?.image}`} width={100} height={100} className={styles.img} />
            <ul>
              {data ? data.data.map((repo: any, i: any) => <li key={i} className={styles.list}>{repo}</li>) : <div>Loading...</div>}
            </ul>
            <button onClick={() => signOut()} className={styles.signout}>Sign out</button>
          </>
          )
        }
        
      </main>
    </div>
  )
}

export default Home
