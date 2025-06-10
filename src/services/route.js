import db from '../models'

export const getRoute = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Route.findAndCountAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: db.Location,
                    as: 'fromLocation',
                    attributes: ['id', 'name', 'province']
                },
                {
                    model: db.Location,
                    as: 'toLocation',
                    attributes: ['id', 'name', 'province']
                }
            ],
            raw: true
        })

        resolve({
            success: response ? true : false,
            data: response? response : null
        })
    } catch (error) {
        reject(error)
    }
})