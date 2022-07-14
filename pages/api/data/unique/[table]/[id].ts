import setHeaders from '@lib/header'
import { prisma } from '@prisma/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req
  const p: any = prisma
  const table: any = query.table
  const id: any = query.id
  let response: any

  try {
    switch (method) {
      case 'GET':
        response = await p[table].findUnique({
          where: { id: id },
          include: tables[table]?.include,
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

const tables: any = {
  companies: {
    include: {
      whitelist: {
        include: {
          molds: true,
        },
      },
      molds: true,
      projects: true,
    },
  },
  colors: {
    include: { surfaces: true },
  },
  drawings: {
    include: { manufactured: true },
  },
  molds: {
    include: {
      whitelist: {
        include: { companies: true },
      },
    },
  },
  projects: {
    include: {
      companies: true,
      products: {
        include: {
          bom: {
            include: {
              manufactured: {
                include: {
                  molds: true,
                },
              },
              purchased: true,
            },
          },
        },
      },
    },
  },
}
