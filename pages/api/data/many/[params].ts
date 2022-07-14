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
        console.log(error)
    }
}

const tables: any = {
    companies: {
        include: { industry: true },
    },
    groups: {
        include: { industry: true, companies: true },
    },
    industries: {
        include: { groups: true, companies: true },
    },
    colors: {
        include: { surfaces: true },
    },
    drawings: {
        include: { manufactured: true },
    },
    molds: {
        include: { companies: true },
    },
    surfaces: {
        include: { colors: true },
    },
    manufactured: {
        orderBy: { createdAt: 'desc' },
    },

}

