const utils = require('../utils')
const ObjectId = require('mongodb').ObjectId;

const collectionName = 'evento'
const parseValues = (values) => {
    return {
        ...values.usuarioId ? { usuarioId: new ObjectId(values.usuarioId) } : {},
        ...values.titulo ? { titulo: values.titulo } : {},
        ...values.descricao ? { descricao: values.descricao } : {},
        ...values.data ? { data: new Date(values.data) } : {},
    }
}

const queryMount = (params) => ({
    ...params.id ? { _id: new ObjectId(params?.id) } : {},
    ...params.usuarioId ? { usuarioId: new ObjectId(params.usuarioId) } : {},
    ...params.titulo ? { titulo: params.titulo } : {},
    ...params.descricao ? { descricao: params.descricao } : {},
})

const find = async (filter, limit) => {
    try {
        const params = filter || {}
        const response = await utils.db.callBack(collectionName, async (collection) => {
            return await utils.db.find(collection, queryMount(params), { id: 1 }, limit)
        });

        return utils.returnDb.success(response)
    } catch (error) {
        return utils.returnDb.error(error.message || error.stack)
    }
}

const findOne = async (filter) => {
    try {
        const params = filter || {}
        const response = await utils.db.callBack(collectionName, async (collection) => {
            return utils.db.findOne(collection, queryMount(params), { id: 1 })
        });

        return utils.returnDb.success(response)
    } catch (error) {
        return utils.returnDb.error(error.message || error.stack)
    }
}

const update = async (filter, value) => {
    try {
        const params = filter || {}
        const response = await utils.db.callBack(collectionName, async (collection) => {
            return await collection.updateOne({
                _id: new ObjectId(params?.id)
            }, { $set: parseValues(value) });
        });

        return utils.returnDb.success(response)
    } catch (error) {
        return utils.returnDb.error(error.message || error.stack)
    }
}

const insert = async (value) => {
    try {
        const dataValue = parseValues(value)
        if (!dataValue.usuarioId || !dataValue.titulo || !dataValue.descricao || !dataValue.data) {
            return httpHelper.badRequest('Paramêtros inválidos')
        }

        const response = await utils.db.callBack(collectionName, async (collection) => {
            return await collection.insertOne(dataValue);
        });

        return utils.returnDb.success(response)
    } catch (error) {
        return utils.returnDb.error(error.message || error.stack)
    }
}



const remove = async (id) => {
    try {
        if (!id) {
            return httpHelper.notFound()
        }

        const response = await utils.db.callBack(collectionName, async (collection) => {
            return await collection.deleteOne({ _id: new ObjectId(id) })
        })

        return utils.returnDb.success(response)
    } catch (error) {
        return utils.returnDb.error(error.message || error.stack)
    }
}

module.exports = {
    find,
    findOne,
    insert,
    update,
    remove,
}