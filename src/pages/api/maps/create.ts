import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req: NextApiRequest,res: NextApiResponse){
  const { name, url_image } = req.body;
  

  await prisma.map.create({
    data:{
      name,
      url_image
    }
  })

  return res.status(201).json({});
}