import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function getAllMaps(req: NextApiRequest,res: NextApiResponse){
  const maps = await prisma.map.findMany();

  return res.status(200).json(maps);
}