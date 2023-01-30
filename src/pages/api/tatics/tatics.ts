import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req: NextApiRequest,res: NextApiResponse){
  if (req.method === 'GET') {
    const tatics = await prisma.tatic.findMany()

    return res.status(200).json(tatics);
    
  }

  if (req.method === 'POST') {
    const tatic = await prisma.tatic.create({
      data: req.body
    })

    return res.status(201).json(tatic);
  }

}