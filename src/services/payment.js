import db from '../models'

const checkBooing = async (bookingInfo) => {
    try {
        console.log('bookingInfo: ', bookingInfo)
        const response = await db.Booking.findOne({
            where: {
                id: bookingInfo,
                booking_status: 'BKS1'
            }
        });
        return response
    } catch (error) {
        console.error('Error checking booking:', error);
    }
    
}

export const sendPayment = (bookingId) => new Promise(async (resolve, reject) => {
    try {
        console.log('bookingId: ', bookingId)

        const bookingResponse = await checkBooing(parseInt(bookingId));

        if (bookingResponse === null) {
            return resolve({
                success: false,
                message: 'Booking not found or already paid'
            });
        }

        const paymentInfo = {
            bookingId: bookingResponse.id,
            totalAmount: bookingResponse.totalAmount,
            reference: bookingResponse.reference,
            expires_at: bookingResponse.expires_at
        };

        const [payment, created] = await db.Payment.findOrCreate({
            where: { bookingId: paymentInfo.bookingId },
            defaults: {
                bookingId: parseInt(paymentInfo.bookingId),
                totalAmount: parseInt(paymentInfo.totalAmount),
                reference: paymentInfo.reference,
                expires_at: paymentInfo.expires_at
            }
        });

        if (payment !== null) {
            const upadteBooking = await db.Booking.update(
                { booking_status: 'BKS4' },
                { where: { id: paymentInfo.bookingId } }
            );
        }

        const { createdAt, updatedAt, ...response } = payment.get({ plain: true });

        resolve({
            success: !!response,
            data: response
        });
    } catch (error) {
        reject(error);
    }
});
