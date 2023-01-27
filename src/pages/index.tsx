import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { prisma } from '@/lib/prisma'
import { Map } from '@prisma/client'


type MapsProps = {
  maps: Map[]
}


export default function Home({maps}:MapsProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col h-full w-full py-12 px-5 items-center'>
        <h1 className='text-5xl font-medium'>Mapas:</h1>
        <a href={`/maps/create`} className='bg-violet-500 p-2 rounded mt-4'> Cadastrar novo </a>
        <div className="maps flex gap-5 mt-10">
          {maps.map((map) => (
            <a href={`/maps/${map.id}`} key={map.id} className="">
              <Image src={map.url_image} className="rounded max-w-[300px] min-h-[200px] object-cover" width={300} height={0} alt={map.name}/>
              <h2>{map.name}</h2>
            </a>
          ))}

        </div>
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const maps = await prisma.map.findMany();

  return {
    props: {
      maps
    }
  }
}