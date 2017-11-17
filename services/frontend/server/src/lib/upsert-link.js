import { getModel } from '../services/pg'

class UpsertLinkError extends Error {}

async function upsertLink (w1: string, w2: string) {
    try {
        const Link = await getModel('Link')
        const link = await Link.findOne({
            where: {
                $or: [
                    { w1, w2 },
                    { w1: w2, w2: w1 },
                ],
            },
            raw: true,
        })

        if (!link) {
            await Link.create({ w1, w2 })
        }
    } catch (e) {
        throw new UpsertLinkError(e)
    }
}

export default upsertLink
