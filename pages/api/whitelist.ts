import setHeaders from '@lib/header'
import { prisma } from '@prisma/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  const { data } = body

  try {
    switch (method) {
      case 'POST':
        await prisma.whitelist.create({
          data: {
            moldNo: data.moldNo,
            companies: {
              connect: {
                name: data.company,
              },
            },
          },
        })
        break
      case 'PATCH':
        await prisma.whitelist.update({
          where: {
            moldNo: data.moldNo,
          },
          data: {
            companies: {
              connect: {
                name: data.company,
              },
            },
          },
        })
        break
      case 'DELETE':
        await prisma.whitelist.update({
          where: {
            moldNo: data.moldNo,
          },
          data: {
            companies: {
              disconnect: {
                id: data.company,
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
