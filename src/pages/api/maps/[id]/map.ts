import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'
import { getMapById } from '@/repositories/mapsRepositories';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req: NextApiRequest,res: NextApiResponse){

  const { id } = req.query;

  const map = await getMapById(Number(id))

  return res.status(200).json(map);
 

}
