import { prisma } from '@/lib/prisma'
import { Tatic as TaticPrismaType, Image as ImagePrismaType  } from '@prisma/client'
import { NextApiRequest } from 'next'


export type TaticsProps = {
  data: TaticPrismaType & {
    Image: ImagePrismaType[]
  }
}


export const getAllTatics = async () =>{
  const tatics = await prisma.tatic.findMany();

  return tatics;
}

export const getTaticById = async (id:string) =>{
  const tatic = await prisma.tatic.findUnique({
    where:{
      id
    },
    include:{
      Image:{
        where:{
          taticId: String(id)
        },
        select:{
          id: true,
          url: true,
          description: true,
          updatedAt: true,
        }
      }
    }
  });

  return tatic;
}

export const createTatic = async(name:string, description:string, mapId:number, req?:NextApiRequest) =>{
  const tatic = await prisma.tatic.create({
    data:{
      name: req?.body.name,
      description: req?.body.description,
      map:{
        connect:{
          id: mapId
        }
      },
    }
  })

  return tatic;
}