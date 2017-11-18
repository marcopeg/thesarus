import { getModel } from '../services/pg'

class UpsertWordError extends Error {}

async function upsertWord (id: string) {
    try {
        const Word = await getModel('Word')
        const word = await Word.findOne({
            where: { id },
            raw: true,
        })

        if (!word) {
            await Word.create({ id })
        }
    } catch (e) {
        throw new UpsertWordError(e)
    }
}

export default upsertWord
