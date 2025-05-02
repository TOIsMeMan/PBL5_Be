import db from '../models'

export const getSeatStatus = ({scheduleId}) => new Promise(async (resolve, reject) => {
    try {
        console.log(parseInt(scheduleId))
        const response = await db.Seat.findAndCountAll({
            where: { scheduleId: parseInt(scheduleId) },
            raw: true
        })
        console.log(response)
        resolve({
            success: response ? true : false,
            data: response? {
                seat: response
            } : null
        })
    } catch (error) {
        reject(error)
    }
})