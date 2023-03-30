const httpHelper = require('../utils/httpHelper')
const db = require('../database')

const find = async ({ queryStringParameters }) => {
    try {
        const params = queryStringParameters || {}
        const query = {
            ...params.id ? { id: params?.id } : {},
            ...params.usuarioId ? { usuarioId: params?.usuarioId } : {}
        }
        const response = await db.event.find(query)
        const list = response.data || []
        const listMount = await Promise.all(list.map(async m => {
            const eventParticipantData = await db.eventParticipant.find({ eventoId: m.id })
            const userData = await db.user.findOne({ id: m.usuarioId })
            delete m.eventoId
            delete m.usuarioId
            const participantes = await Promise.all(eventParticipantData.data.map(async ev => {
                const userData = await db.user.findOne({ id: ev.usuarioId })
                delete ev.eventoId
                delete userData.data._id
                return {
                    ...ev,
                    ...userData.data
                }
            }))
            return ({
                ...m,
                usuario: userData.data,
                participantes
            })
        }))

        return httpHelper.ok(listMount)
    } catch (error) {
        return httpHelper.badRequest(error)
    }
}

const update = async ({ queryStringParameters, body }) => {
    try {
        const params = queryStringParameters
        const value = JSON.parse(body)
        const filter = { id: params?.id }
        const response = await db.event.update(filter, value)
        return httpHelper.ok(response)
    } catch (error) {
        return httpHelper.badRequest(error)
    }
}

const insert = async ({
    body
}) => {
    try {
        const value = JSON.parse(body)
        const response = await db.event.insert(value)
        return httpHelper.ok(response)
    } catch (error) {
        return httpHelper.badRequest(error)
    }
}

const remove = async ({ queryStringParameters }) => {
    try {
        const params = queryStringParameters
        if (!params?.id) {
            return httpHelper.notFound()
        }
        const response = await db.event.remove(params?.id)
        return httpHelper.ok(response)
    } catch (error) {
        return httpHelper.badRequest(error)
    }
}


module.exports = {
    find,
    insert,
    update,
    remove
}