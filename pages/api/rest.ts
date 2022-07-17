import setHeaders from '@lib/header'
import { prisma } from '@prisma/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  const { data, table, alsoDelete } = body

  const t: string = table
  const p: any = prisma
  const aD: any = alsoDelete

  try {
    switch (method) {
      case 'POST':
        await p[t].create({ data: { ...data } })
        break
      case 'PATCH':
        await p[t].update({ where: { id: data } })
        break
      case 'DELETE':
        try {
          for (let i in aD) {
            await p[aD[i].table].delete({ where: { id: aD[i].id } })
          }
        } catch (error) {
          res.status(400).json(error)
        }
        await p[t].delete({ where: { id: data } })
        break

      default:
        break
    }
    setHeaders(req, res, method)
    res.status(200).json(data)
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(409).json(error)
    } else {
      res.status(400).json(error)
    }
  }
}
