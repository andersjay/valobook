import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'
import { getTaticById } from '@/repositories/taticsRepositories';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function getMapById(req: NextApiRequest,res: NextApiResponse){

  
 if (req.method === 'GET') {
  const { id } = req.query;

  const tatic = await getTaticById(String(id))
  
  return res.status(200).json(tatic);
 }

}
