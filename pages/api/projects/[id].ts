import setHeaders from '@lib/header'
import { prisma } from '@prisma/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req

  const id = query.id || ''

  let response: any

  try {
    switch (method) {
      case 'GET':
        response = await prisma.projects.findUnique({
          where: {
            id: id,
          },
          include: {
            products: true,
          },
        })
        break
      default:
        break
    }
    setHeaders(req, res, method)
    res.status(200).json(response)
  } catch (error: any) {
    res.status(400).json(error)
    console.log(error)
  }
}
