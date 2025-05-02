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

export const sendBooking = ({id, scheduleId}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
                    where: { id: userId },
                    attributes:{
                        exclude: ['password', 'createdAt', 'updatedAt']                            
                    },
                    include: [
                        {
                            model: db.Role, 
                            as: 'roleData',
                            attributes: [
                                'id',
                                'code',
                                'value'
                            ]
                        }
                    ],
                    raw: true,
                    nest: true
                })

        resolve({
            success: response ? true : false,
            data: response? {
                user: response
            } : null
        })
    } catch (error) {
        reject(error)
    }
})