import { getModel } from '../services/pg'

class UpsertLinkError extends Error {}

async function upsertLink (entityId: string, nodeId: number) {
    try {
        const Link = await getModel('Link')
        const link = await Link.findOne({
            where: {
                entity_id: entityId,
                node_id: nodeId,
            },
        })

        if (!link) {
            return Link.create({
                entity_id: entityId,
                node_id: nodeId,
            })
        }

        return link
    } catch (e) {
        throw new UpsertLinkError(e)
    }
}

export default upsertLink
