import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'
import { cors } from '@/utils/cors';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req: NextApiRequest,res: NextApiResponse){
  
  cors(req, res);

  if (req.method === 'GET') {
    const tatics = await prisma.tatic.findMany()

    return res.status(200).json(tatics);
    
  }

  if (req.method === 'POST') {

    const { name, description, mapId } = req.body;
    const mapIdParsed = parseInt(mapId);
    const tatic = await prisma.tatic.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        map:{
          connect:{
            id: mapIdParsed
          }
        },
      },


    })

    return res.status(201).json(tatic.id);
  }

}