import setHeaders from '@lib/header'
import { prisma } from '@prisma/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  const { data } = body

  try {
    switch (method) {
      case 'PATCH':
        await prisma.products.update({
          where: {
            id: data.id,
          },
          data: {
            projects: {
              connect: {
                name: data.project,
              },
            },
          },
        })
        break
      case 'DELETE':
        await prisma.products.update({
          where: {
            id: data.id,
          },
          data: {
            projects: {
              disconnect: {
                id: data.project,
              },
            },
          },
        })
        break
      default:
        break
    }
    setHeaders(req, res, method)
    res.status(200).json(data)
  } catch (error: any) {
    res.status(400).json(error)
    // console.log(error)
  }
}
