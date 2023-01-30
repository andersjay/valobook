import { Image as ImagePrismaType, Tatic as TaticPrismaType } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { Pagination, Navigation,Keyboard } from "swiper";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import axios from "axios";

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

  console.log(data)

  return (
    <div className='flex flex-col h-full py-12 px-5 overflow-hidden'>
      <h1 className='text-5xl font-medium'>{data.name}</h1>

      <Swiper
        pagination={{
          type: "progressbar",
        }}
        keyboard={true}
        
        navigation={true}
        modules={[Pagination, Navigation, Keyboard]}
        className="mySwiper w-[800px] rounded-lg "
      >
        {data.Image.map((image) => (
          <SwiperSlide key={image.id}>
            <Image src={image.url} width={1920} height={1080} alt={image.name} className="object-cover" />

            <p>{image.description}</p>
          </SwiperSlide>

        ))}
      </Swiper>
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

  console.log(data)

  return {
    props: {
      data
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}