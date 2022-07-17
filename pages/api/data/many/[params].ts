import setHeaders from '@lib/header'
import { prisma } from '@prisma/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query }: any = req
  const table: any = query.params
  const p: any = prisma

  let response: any

  try {
    switch (method) {
      case 'GET':
        response = await p[table].findMany(tables[table] || {})
        break
      default:
        break
    }
    setHeaders(req, res, method)
    res.status(200).json(response)
  } catch (error: any) {
    res.status(400).json(error)
    // console.log(error)
  }
}

const tables: any = {
  companies: {
    orderBy: { createdAt: 'desc' },
    include: {
      industry: true, molds: true, whitelist: true, projects: {
        include: { products: true }
      }
    },
  },
  groups: {
    orderBy: { createdAt: 'desc' },
    include: { industry: true, companies: true },
  },
  industries: {
    orderBy: { createdAt: 'desc' },
    include: { groups: true, companies: true },
  },
  colors: {
    orderBy: { createdAt: 'desc' },
    include: { surfaces: true, manufactured: true },
  },
  drawings: {
    orderBy: { createdAt: 'desc' },
    include: { manufactured: true },
  },
  molds: {
    orderBy: { createdAt: 'desc' },
    include: { companies: true, manufactured: true, whitelist: { include: { companies: true } } },
  },
  surfaces: {
    orderBy: { createdAt: 'desc' },
    include: { colors: true, manufactured: true },
  },
  manufactured: {
    orderBy: { createdAt: 'desc', },
    include: { bom: true }
  },
  purchased: {
    orderBy: { createdAt: 'desc' },
    include: { bom: true }
  },
  products: {
    orderBy: { createdAt: 'desc' },
    include: {
      projects: true, bom: {
        include: { manufactured: true, purchased: true }
      }
    }
  },
  alloys: {
    orderBy: { createdAt: 'desc' },
    include: { manufactured: true }
  },
  projects: {
    orderBy: { createdAt: 'desc' },
    include: {
      products: true, companies: {
        include: {
          molds: true, whitelist: {
            include: { molds: true }
          }
        }
      }
    }
  }
}
