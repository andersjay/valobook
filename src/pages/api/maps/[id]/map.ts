import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'

// eslint-disable-next-line import/no-anonymous-default-export
export default async function getMapById(req: NextApiRequest,res: NextApiResponse){
  const { id } = req.query;

  console.log('ID',id?.toString())

  const map = await prisma.map.findMany()

  return res.status(200).json({map});

}
