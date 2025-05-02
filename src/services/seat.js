import db from '../models'

export const getSeatStatus = ({scheduleId}) => new Promise(async (resolve, reject) => {
    try {
        console.log(parseInt(scheduleId))
        const response = await db.Seat.findAll({
            where: { scheduleId: parseInt(scheduleId) },
            raw: true
        })
        const seatStatusResponse = response.map(seat => seat.seat_status === 'SS1' ? '1' : '0').join('')
        const seatIds = response.map(seat => seat.id)
        resolve({
            success: response ? true : false,
            data: response? {
                seatStatusCode: seatStatusResponse,
                seats: seatIds
            } : null
        })
    } catch (error) {
        reject(error)
    }
})