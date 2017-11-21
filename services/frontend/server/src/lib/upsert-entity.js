import { getModel } from '../services/pg'

class UpsertEntityError extends Error {}

async function upsertEntity (data: any) {
    try {
        const Entity = await getModel('Entity')
        const entity = await Entity.findOne({
            where: { id: data.id },
        })

        if (entity) {
            return entity.update({ ...data })
        }

        return Entity.create({ ...data })
    } catch (e) {
        throw new UpsertEntityError(e)
    }
}

export default upsertEntity
