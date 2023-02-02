import NextCors from 'nextjs-cors';
import { NextApiRequest, NextApiResponse} from 'next'

export const cors = (req: NextApiRequest, res:NextApiResponse) => NextCors(req, res, {
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  origin: '*',
  optionsSuccessStatus: 200
});