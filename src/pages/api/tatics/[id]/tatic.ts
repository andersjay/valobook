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

  const tatic = await prisma.tatic.findUnique({
    
    where:{
      id: String(id)
    },
    include:{
      Image:{
        where:{
          taticId: String(id)
        },
        select:{
          id: true,
          url: true,
          description: true,
          updatedAt: true,
          
          
        }
      }
    },
    
    

  })

  return res.status(200).json(tatic);
 }

}
