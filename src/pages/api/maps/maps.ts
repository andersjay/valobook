import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req: NextApiRequest,res: NextApiResponse){
  if (req.method === 'GET') {
    const maps = await prisma.map.findMany()

    return res.status(200).json(maps);
    
  }else if(req.method === 'POST'){
    const { name, url_image } = req.body;
  

    const map =  await prisma.map.create({
       data:{
         name,
         url_image
       }
     })
   
     return res.status(201).json(map);
  }

}