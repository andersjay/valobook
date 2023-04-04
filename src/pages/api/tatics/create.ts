import { NextApiRequest, NextApiResponse } from 'next';
import { createTatic } from '@/repositories/taticsRepositories';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req: NextApiRequest,res: NextApiResponse){
  
    const { name, description, mapId, side } = req.body;
    const mapIdParsed = parseInt(mapId);
    
    const tatic = await createTatic(name, description, mapIdParsed, side)

    return res.status(201).json(tatic.id);
  }



