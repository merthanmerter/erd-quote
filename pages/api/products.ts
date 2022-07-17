import setHeaders from '@lib/header'
import { prisma } from '@prisma/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  const { data } = body

  try {
    switch (method) {
      case 'PATCH':
        await prisma.projects.update({
          where: {
            id: data.project,
          },
          data: {
            products: {
              connect: {
                customerProductId: data.product,
              },
            },
          },
        })
        break
      case 'DELETE':
        await prisma.projects.update({
          where: {
            id: data.project,
          },
          data: {
            products: {
              disconnect: {
                id: data.product,
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
