import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req: NextApiRequest,res: NextApiResponse){
  if (req.method === 'GET') {
    return res.status(200).json({message: 'Implementation in progress'});
    
  }else if(req.method === 'POST'){



    const { description, url, taticId, name } = req.body;
  

    const image =  await prisma.image.create({
       data:{
         url,
         description,
          tatic:{
            connect:{
              id: taticId
            }
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          name
        

       }
     })
   
     return res.status(201).json(image);
  }

}