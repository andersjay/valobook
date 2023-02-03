import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'
import { createMap } from '@/repositories/mapsRepositories';


// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req: NextApiRequest,res: NextApiResponse){

    const { name, url_image } = req.body;

    const map = await createMap(name, url_image)

    return res.status(201).json(map);
}