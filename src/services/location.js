    import db from '../models'
    import {Op} from 'sequelize'

    export const searchLocation = (text) => new Promise(async (resolve, reject) => {
        try {
            console.log(`text: ${text}`)

            const response = await db.Location.findAndCountAll({
                where: {
                    [Op.or]: [
                        {name: {[Op.substring]: text.text}},
                        {province: {[Op.substring]: text}}
                    ]
                },
                attributes:{
                    exclude: ['createdAt', 'updatedAt', 'type_code']                            
                }
            })

            console.log(`response: ${response}`)

            resolve({
                success: response ? true : false,
                data: response? response : null
            })
        } catch (error) {
            reject(error)   
        }
    })