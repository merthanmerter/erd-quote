import setHeaders from '@lib/header'
import { prisma } from '@prisma/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req
  const { data, table } = body

  const t: string = table
  const p: any = prisma

  try {
    switch (method) {
      case 'POST':
        await p[t].create({ data: { ...data } })
        break
      case 'PATCH':
        await p[t].update({ where: { id: data } })
        break
      case 'DELETE':
        await p[t].delete({ where: { id: data } })
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
