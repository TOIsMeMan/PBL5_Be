import db from '../models'

export const sendPayment = (paymentInfo) => new Promise(async (resolve, reject) => {
    try {
        const [payment, created] = await db.Payment.findOrCreate({
            where: { bookingId: paymentInfo.bookingId },
            defaults: {
                bookingId: parseInt(paymentInfo.bookingId),
                totalAmount: parseInt(paymentInfo.totalAmount),
                reference: paymentInfo.reference,
                expires_at: new Date(paymentInfo.expires_at)
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
