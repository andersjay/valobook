import { prisma } from "@/lib/prisma";
import { getAllMaps, getMapById } from "@/repositories/mapsRepositories";
import { Tatic as TaticPrisma, Map as MapPrisma } from "@prisma/client";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router"
import classNames from "classnames";

type MapsProps = {
 data:{
  id: string;
  name: string;
  url_image: string;
  Tatic: TaticPrisma[];
 }
}

export default function Map({ data }: MapsProps) {

  const router = useRouter();

  console.log(data.Tatic)

  if (router.isFallback) return <div>Loading...</div>

  return (
    <div className='flex flex-col h-full w-full py-12 px-5 items-center'>
      <h1 className='text-5xl font-medium'>{data.name}</h1>
      <div className="flex gap-2">
        <a href={`/`} className='bg-violet-500 p-2 rounded mt-4'> Back </a>
      </div>

      <div className="maps flex gap-5 mt-10">
        {data.Tatic?.map((tatic) => {
          return (
            <a href={`/tatics/${tatic.id}`} key={tatic.id}  >
              <div className={classNames(`w-[200px] h-[200px] rounded-md bg-zinc-900 flex justify-center items-center border-2 ${tatic.side == 'atk' ? 'border-red-500' : 'border-blue-500' }`)}>
                <h2 className="font-bold">{tatic.name}</h2>
              </div>
            </a>
          )
        })}

      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const maps = await getAllMaps()

  const paths = maps.map((map: any) => {

    return {
      params: { id: map.id.toString() }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context: any) => {

  const { id } = context.params

  const maps = await getMapById(Number(id))

  return {
    props: {
      data: maps
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
