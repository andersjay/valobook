import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'
import cors from 'cors';
const express = require('express');
const app = express();
app.use(cors());
// eslint-disable-next-line import/no-anonymous-default-export
export default async function getMapById(req: NextApiRequest,res: NextApiResponse){

  

 if (req.method === 'GET') {
  const { id } = req.query;

  const map = await prisma.map.findUnique({
    where:{
      id: Number(id)
    },
    include:{
      Tatic:{
       where:{
          mapId: Number(id)
       },
       select:{
        id: true,
        name: true,
      }
      }
    }
  })

  return res.status(200).json(map);
 }

}
