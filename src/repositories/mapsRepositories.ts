import { prisma } from "@/lib/prisma";
import {NextApiResponse } from "next";

export type MapType = {
  id: number;
  name: string;
  url_image: string;
}

export const getAllMaps = async () =>{
  const maps = await prisma.map.findMany();

  return maps;
}

export const getMapById = async (id:number) =>{
  const map = await prisma.map.findUnique({
    where:{
      id
    }
  });

  return map;
}

export const createMap = async (name:string, url_image:string) =>{
  const map = await prisma.map.create({
    data:{
      name,
      url_image
    }
  });

  return map;
}
