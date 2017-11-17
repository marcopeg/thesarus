import { getModel } from '../services/pg'

class UpsertWordError extends Error {}

async function upsertWord (value: string) {
    try {
        const Word = await getModel('Word')
        const word = await Word.findOne({
            where: { value },
            raw: true,
        })

        if (!word) {
            await Word.create({ value })
        }
    } catch (e) {
        throw new UpsertWordError(e)
    }
}

export default upsertWord
