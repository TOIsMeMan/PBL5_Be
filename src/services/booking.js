import { where } from 'sequelize';
import db from '../models'

const generateBookingReference = (scheduleId) => {
    const now = new Date();
    const y = String(now.getFullYear()).slice(-2);
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const datePart = `${y}${m}${d}`;
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase(); // ví dụ: A3KF
    return `BK-${datePart}-${scheduleId}-${randomPart}`;
  };  

  const generateQrUrl = ({ bankCode, accountNumber, amount, reference }) => {
    if (!bankCode || !accountNumber || !amount || !reference) {
      throw new Error("Missing required parameter for QR generation");
    }
  
    // VietQR.io link format
    return `https://img.vietqr.io/image/${bankCode}-${accountNumber}-qr_only.png?amount=${amount}&addInfo=${encodeURIComponent(reference)}`;
  };
  
const getTotalAmount = async (scheduleId, numOfTicket) => {
    try {
        const id = parseInt(scheduleId)
        const schedule = await db.Schedule.findOne({ 
            where: { id: id } 
        });
        return schedule.price * numOfTicket;
    } catch (error) {
        reject(error)
    }
}

export const sendBooking = (bookingInfo) => new Promise(async (resolve, reject) => {
    try {
        for (const seat of bookingInfo.seats) {
            const findSeat = await db.BookingSeat.findOne({
              where: { seatId: parseInt(seat) }
            });
          
            if (findSeat !== null) {
              return resolve({
                success: false,
                message: 'Seats are unavailable'
              });
            }
        }        

        const reference = generateBookingReference(bookingInfo.scheduleId)

        const totalAmount = await getTotalAmount(bookingInfo.scheduleId, bookingInfo.seats.length)

        const qrUrl = generateQrUrl({
            bankCode: 'TPB',
            accountNumber: '22213092004',
            amount: totalAmount,
            reference: generateBookingReference(bookingInfo.scheduleId)
        })

        const response = await db.Booking.create({
            userId: bookingInfo.userId,
            scheduleId: bookingInfo.scheduleId,
            reference: reference,
            totalAmount: totalAmount,
            payment_url: qrUrl,
            expires_at: new Date(Date.now() + 30 * 60 * 1000) // 30 phút sau
        })

        const { createdAt, updatedAt, ...cleaned } = response.get({ plain: true });

        if (response !== null) {
            bookingInfo.seats.forEach( async seat => {
                console.log('seat: ', seat)
                const bookingSeat = await db.BookingSeat.findOrCreate({
                    where: {
                        seatId: parseInt(seat)
                    },
                    defaults: {
                        bookingId: response.id,
                        seatId: parseInt(seat)
                    }
                })
                if (bookingSeat) { 
                    console.log('in seat')
                    const updateSeat = await db.Seat.update(
                        { seat_status: 'SS3' },
                        { where: { id: parseInt(seat) } }
                    )
                    console.log('Seat: ', updateSeat)
                }
            })
            
            const schedule = await db.Schedule.findOne({ where: { id: response.scheduleId } });
            const remaining = schedule.availableSeats - bookingInfo.seats.length;
            
            await db.Schedule.update(
              { availableSeats: remaining },
              { where: { id: response.scheduleId } }
            );
                                    
        }

        resolve({
            success: response ? true : false,
            data: response? cleaned : null
        })
    } catch (error) {
        reject(error)
    }
})

export const getBookingById = (bookingDetailInfo) => new Promise(async (resolve, reject) => {
    try {
        const bookingId = bookingDetailInfo.bookingId

        const response = await db.Booking.findOne({
            where: { id: bookingId },
            attributes:{
                exclude: ['createdAt', 'updatedAt']                            
            },
            include: [
                {
                    model: db.Schedule,
                    as: 'scheduleData',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.Route,
                            as: 'routeData',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt', 'duration', 'distance', 'description', 'status_code']
                            },
                            include: [
                                {
                                    model: db.Location,
                                    as: 'fromLocation',
                                    attributes: ['name']
                                },
                                {
                                    model: db.Location,
                                    as: 'toLocation',
                                    attributes: ['name']
                                }
                            ]
    
                        }
                    ]
                }
            ]
        })

        if (!response) {
            return resolve({
                success: false,
                message: 'Booking not found'
            })
        }

        if (response.userId !== bookingDetailInfo.userId) {
            return resolve({
                success: false,
                message: 'You are not authorized to view this booking'
            })
        }

        const seats = await db.BookingSeat.findAndCountAll({
            where: { bookingId: response.id },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        resolve({
            success: response ? true : false,
            data: response ? {
                boking: response,
                seats: seats
            } : null
        })
    } catch (error) {
        reject(error)
    }
})

export const getAllBooking = (userId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Booking.findAndCountAll({
            where: { userId },
            attributes:{
                exclude: ['createdAt', 'updatedAt']                            
            },
            include: [
                {
                    model: db.Schedule,
                    as: 'scheduleData',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', "availableSeats", "totalSeats", "busType", "status_code"]
                    },
                    include: [
                        {
                            model: db.Route,
                            as: 'routeData',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt', 'duration', 'distance', 'description', 'status_code']
                            },
                            include: [
                                {
                                    model: db.Location,
                                    as: 'fromLocation',
                                    attributes: ['name']
                                },
                                {
                                    model: db.Location,
                                    as: 'toLocation',
                                    attributes: ['name']
                                }
                            ]

                        }
                    ]

                }
            ]
        })

        resolve({
            success: response ? true : false,
            data: response ? response : null
        })
    } catch (error) {
        reject(error)
    }
})