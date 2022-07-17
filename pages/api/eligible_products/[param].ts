import setHeaders from '@lib/header'
import { prisma } from '@prisma/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req

    const companyId: any = query.param

    try {
        if (method == 'GET') {
            const belongingMolds: any = await prisma.products.findMany({
                orderBy: { createdAt: 'desc' },
                where: {
                    AND: {
                        bom: {
                            some: {
                                manufactured: {
                                    molds: {
                                        companiesId: {
                                            equals: companyId
                                        },
                                    },
                                },
                            },
                        },
                    },

                },
            })
            const whitelistedMolds = await prisma.products.findMany({
                orderBy: { createdAt: 'desc' },
                where: {
                    AND: {
                        bom: {
                            some: {
                                manufactured: {
                                    molds: {
                                        whitelist: {
                                            companies: {
                                                some: {
                                                    name: {
                                                        equals: companyId
                                                    }
                                                }
                                            }
                                        }
                                    },
                                },
                            },
                        },
                    },
                },
            })
            const response: any = belongingMolds.concat(whitelistedMolds)
            setHeaders(req, res, method)
            res.status(200).json((response))
        } else {
            res.status(200).json([])
        }
    } catch (error: any) {
        res.status(400).json(error)
    }
}

