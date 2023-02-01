import { Image as ImagePrismaType, Tatic as TaticPrismaType } from "@prisma/client";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard } from "swiper";
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type TaticsProps = {
  data: TaticPrismaType & {
    Image: ImagePrismaType[]
  }

}

export default function Tatic({ data }: TaticsProps) {

  return (
    <div className='flex flex-col pt-12 px-5 items-center overflow-hidden w-screen h-screen'>
      <div className="flex gap-4 items-center">
        <h1 className='text-5xl font-medium'>{data.name}</h1>
        <a href={`/`} className='bg-violet-500 p-2 rounded'> Back </a>
      </div>

      <Swiper
        pagination={{
          type: "progressbar",
          progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
        }}
        keyboard={true}

        navigation={true}
        modules={[Pagination, Navigation, Keyboard]}
        className="mySwiper w-1/2 rounded-lg mt-4  "
      >
        {data.Image.map((image, index) => (
          <SwiperSlide key={image.id}>
            <Image src={image.url} width={1920} height={1080} alt={image.description} className="object-cover" />

            <h2 className="mt-4 mb-4">Step {index + 1 } - {image.description}</h2>
          </SwiperSlide>

        ))}
      </Swiper>

      <div className="border border-violet-500 rounded-lg w-1/2 py-5 px-3">
        <h2 className="font-bold text-center">Description</h2>

        <p className="mt-4">{data.description}</p>
      </div>
    </div>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('http://localhost:3000/api/tatics/tatics')
  const data = response.data

  const paths = data.map((map: any) => {

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

  const res = await axios.get(`http://localhost:3000/api/tatics/${id}/tatic`)
  const data = res.data

  return {
    props: {
      data
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}