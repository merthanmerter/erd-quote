import setHeaders from '@lib/header'
import { prisma } from '@prisma/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  const { data } = body

  try {
    switch (method) {
      case 'PATCH':
        await prisma.colors.update({
          where: {
            color: data.color,
          },
          data: {
            surfaces: {
              connect: {
                surface: data.surface,
              },
            },
          },
        })
        break
      case 'DELETE':
        await prisma.colors.update({
          where: {
            color: data.color,
          },
          data: {
            surfaces: {
              disconnect: {
                id: data.surface,
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
    console.log(error)
  }
}
