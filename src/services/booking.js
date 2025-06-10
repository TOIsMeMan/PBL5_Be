import { where } from 'sequelize';
import db from '../models'

const generateBookingReference = (scheduleId) => {
    const now = new Date();
    const y = String(now.getFullYear()).slice(-2);
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const datePart = `${y}${m}${d}`;
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
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
        
        if (!schedule) {
            throw new Error('Schedule not found');
        }
        
        if (!schedule.price) {
            throw new Error('Schedule price is not set');
        }
        
        return schedule.price * numOfTicket;
    } catch (error) {
        throw error;
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
            reference: reference
        })

        const response = await db.Booking.create({
            name: bookingInfo.name,
            phone: bookingInfo.phone,
            email: bookingInfo.email,
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
            data: response ? cleaned : null
        })
    } catch (error) {
        reject(error)
    }
})

export const getBookingById = (bookingDetailInfo) => new Promise(async (resolve, reject) => {
    try {
        const bookingId = bookingDetailInfo.bookingId
        console.log("booking id: ", bookingId)

        const response = await db.Booking.findOne({
            where: { id: bookingId },
            attributes: {
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

        console.log("done get response")
        if (!response) {
            return resolve({
                success: false,
                message: 'Booking not found'
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
                booking: response,
                seats: seats
            } : null
        })
    } catch (error) {
        console.error('Error in getBookingById:', error);
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

export const updateBookingStatus = ({ bookingId, booking_status }) => new Promise(async (resolve, reject) => {
    try {
        // Các trạng thái hợp lệ mới
        const validStatus = ['BKS1', 'BKS2', 'BKS3', 'BKS4'];
        if (!validStatus.includes(booking_status)) {
            return resolve({
                success: false,
                message: 'Invalid booking status'
            });
        }

        const booking = await db.Booking.findByPk(bookingId);
        if (!booking) {
            return resolve({
                success: false,
                message: 'Booking not found'
            });
        }

        booking.booking_status = booking_status;
        await booking.save();

        resolve({
            success: true,
            data: booking
        });
    } catch (error) {
        reject(error);
    }
});

export const getAllBookingAdmin = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Booking.findAndCountAll({
            attributes: {
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
        });

        resolve({
            success: response ? true : false,
            data: response ? response : null
        });
    } catch (error) {
        reject(error);
    }
});

export const getBookingByReference = ({ reference }) => new Promise(async (resolve, reject) => {
    try {
        const booking = await db.Booking.findAndCountAll({
            where: { reference },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
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
        });

        resolve({
            success: booking ? true : false,
            data: booking ? booking : null
        });
    } catch (error) {
        reject(error);
    }
});